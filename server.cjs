const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const trialHandler = require('./api/trial');

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const MAX_BODY_SIZE = 16 * 1024;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon'
};

function loadEnvFile() {
    const envPath = path.join(ROOT, '.env');
    if (!fs.existsSync(envPath)) return;

    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;

        const index = trimmed.indexOf('=');
        const key = trimmed.slice(0, index).trim();
        const value = trimmed.slice(index + 1).trim().replace(/^['"]|['"]$/g, '');
        if (key && process.env[key] === undefined) {
            process.env[key] = value;
        }
    }
}

function setCommonHeaders(res) {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}

function sendJson(res, statusCode, payload) {
    if (res.writableEnded) return;
    setCommonHeaders(res);
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(payload));
}

function createApiResponse(res) {
    return {
        statusCode: 200,
        status(code) {
            this.statusCode = code;
            return this;
        },
        json(payload) {
            sendJson(res, this.statusCode, payload);
            return this;
        }
    };
}

async function handleApiRequest(handler, req, res, shouldReadBody) {
    try {
        if (shouldReadBody) {
            req.body = await readJsonBody(req);
        }
        await handler(req, createApiResponse(res));
    } catch (err) {
        if (err.message === 'BODY_TOO_LARGE') {
            sendJson(res, 413, { error: '请求内容过大' });
            return;
        }
        if (err.message === 'INVALID_JSON') {
            sendJson(res, 400, { error: '请求格式不正确' });
            return;
        }
        sendJson(res, 500, { error: '服务器错误' });
    }
}

function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let size = 0;
        const chunks = [];

        req.on('data', chunk => {
            size += chunk.length;
            if (size > MAX_BODY_SIZE) {
                reject(new Error('BODY_TOO_LARGE'));
                req.destroy();
                return;
            }
            chunks.push(chunk);
        });

        req.on('end', () => {
            const raw = Buffer.concat(chunks).toString('utf8');
            if (!raw) {
                resolve({});
                return;
            }

            try {
                resolve(JSON.parse(raw));
            } catch (err) {
                reject(new Error('INVALID_JSON'));
            }
        });

        req.on('error', reject);
    });
}

function isBlockedFile(filePath) {
    const relative = path.relative(ROOT, filePath);
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) return true;

    const base = path.basename(filePath);
    if (base.startsWith('.')) return true;
    if (relative.startsWith(`api${path.sep}`)) return true;
    if (['server.cjs', 'package.json', 'package-lock.json', 'ecosystem.config.cjs', 'README.md'].includes(relative)) {
        return true;
    }

    return false;
}

function resolveStaticPath(urlPath) {
    let decodedPath;
    try {
        decodedPath = decodeURIComponent(urlPath);
    } catch (err) {
        return null;
    }

    const cleanPath = decodedPath === '/' ? '/index.html' : decodedPath;
    const filePath = path.resolve(ROOT, `.${cleanPath}`);
    if (isBlockedFile(filePath)) return null;
    return filePath;
}

function serveStatic(req, res, pathname) {
    const filePath = resolveStaticPath(pathname);
    if (!filePath) {
        sendJson(res, 404, { error: 'Not found' });
        return;
    }

    fs.stat(filePath, (statErr, stat) => {
        if (statErr || !stat.isFile()) {
            sendJson(res, 404, { error: 'Not found' });
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        setCommonHeaders(res);
        res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
        res.setHeader('Content-Length', stat.size);

        if (ext === '.html' || ext === '.xml') {
            res.setHeader('Cache-Control', 'no-cache');
        } else {
            res.setHeader('Cache-Control', 'public, max-age=604800');
        }

        if (req.method === 'HEAD') {
            res.statusCode = 200;
            res.end();
            return;
        }

        fs.createReadStream(filePath)
            .on('error', () => sendJson(res, 500, { error: 'Server error' }))
            .pipe(res);
    });
}

async function handleApiTrial(req, res) {
    await handleApiRequest(trialHandler, req, res, true);
}

loadEnvFile();

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

    if (url.pathname === '/api/trial') {
        handleApiTrial(req, res);
        return;
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        sendJson(res, 405, { error: 'Method not allowed' });
        return;
    }

    serveStatic(req, res, url.pathname);
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`dfkefu-site listening on http://127.0.0.1:${PORT}`);
});
