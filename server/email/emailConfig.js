module.exports = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    // secure: true,
    secure: false,
    pool: true,
    maxConnections: 1,
    maxMessages: 5,
    auth:
    {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
}

