const fs = require('node:fs/promises');
const path = require('node:path');

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const rateBuckets = new Map();

function getClientIp(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
}

function isRateLimited(ip) {
    const now = Date.now();
    const bucket = rateBuckets.get(ip) || { count: 0, resetAt: now + WINDOW_MS };

    if (bucket.resetAt <= now) {
        bucket.count = 0;
        bucket.resetAt = now + WINDOW_MS;
    }

    bucket.count += 1;
    rateBuckets.set(ip, bucket);
    return bucket.count > MAX_REQUESTS_PER_WINDOW;
}

function cleanText(value, maxLength) {
    return String(value || '')
        .replace(/[<>{}]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, maxLength);
}

function cleanPhone(value) {
    return String(value || '').replace(/[^\d]/g, '').slice(0, 11);
}

async function saveSubmission(data) {
    const dataDir = path.join(__dirname, '..', 'data');
    const filePath = path.join(dataDir, 'trial-submissions.jsonl');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.appendFile(filePath, JSON.stringify(data) + '\n', 'utf8');
}

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const ip = getClientIp(req);
        if (isRateLimited(ip)) {
            return res.status(429).json({ error: '提交过于频繁，请稍后再试' });
        }

        const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
        if (body.website) {
            return res.status(200).json({ success: true });
        }

        const shop = cleanText(body.shop, 60);
        const platform = cleanText(body.platform, 40);
        const category = cleanText(body.category, 40);
        const phone = cleanPhone(body.phone);
        const remark = cleanText(body.remark, 200);

        if (!shop || !phone) {
            return res.status(400).json({ error: '店铺名称和手机号必填' });
        }

        if (!/^1[3-9]\d{9}$/.test(phone)) {
            return res.status(400).json({ error: '手机号格式不正确' });
        }

        var now = new Date();
        var timeStr = now.getFullYear() + '-' +
            String(now.getMonth() + 1).padStart(2, '0') + '-' +
            String(now.getDate()).padStart(2, '0') + ' ' +
            String(now.getHours()).padStart(2, '0') + ':' +
            String(now.getMinutes()).padStart(2, '0') + ':' +
            String(now.getSeconds()).padStart(2, '0');

        var msg = {
            msgtype: 'markdown',
            markdown: {
                content: '📋 **新试用申请**\n\n' +
                    '🏪 **店铺名称：** ' + shop + '\n' +
                    '🛒 **平台：** ' + (platform || '未填写') + '\n' +
                    '📂 **类目：** ' + (category || '未填写') + '\n' +
                    '📞 **手机号：** ' + phone + '\n' +
                    '📝 **备注：** ' + (remark || '无') + '\n\n' +
                    '⏰ **提交时间：** ' + timeStr
            }
        };

        await saveSubmission({
            shop,
            platform,
            category,
            phone,
            remark,
            ip,
            submittedAt: now.toISOString(),
            submittedAtText: timeStr
        });

        const webhookUrl = process.env.WECOM_TRIAL_WEBHOOK_URL || process.env.WECOM_WEBHOOK_URL;
        if (!webhookUrl) {
            console.warn('Trial submission saved, but WECOM webhook is not configured.');
            return res.status(200).json({ success: true, notified: false });
        }

        var controller = new AbortController();
        var timeout = setTimeout(function() { controller.abort(); }, 8000);

        var wecomRes = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg),
            signal: controller.signal
        });
        clearTimeout(timeout);

        var result = await wecomRes.json();

        if (result.errcode === 0) {
            return res.status(200).json({ success: true, notified: true });
        } else {
            console.warn('Trial submission saved, but WECOM notification failed:', result.errcode, result.errmsg);
            return res.status(200).json({ success: true, notified: false });
        }
    } catch (err) {
        console.error('Trial submission failed:', err);
        return res.status(500).json({ error: '服务器错误' });
    }
};
