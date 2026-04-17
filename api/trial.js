module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { shop, platform, category, phone, remark } = req.body;

        if (!shop || !phone) {
            return res.status(400).json({ error: '店铺名称和手机号必填' });
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

        var wecomRes = await fetch('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=aa1b8196-4909-48ae-98a4-c14ac501b783', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        });

        var result = await wecomRes.json();

        if (result.errcode === 0) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(200).json({ success: false, error: result.errmsg });
        }
    } catch (err) {
        return res.status(500).json({ error: '服务器错误' });
    }
};
