module.exports = {
    apps: [
        {
            name: 'dfkefu-site',
            script: 'server.cjs',
            cwd: __dirname,
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
};
