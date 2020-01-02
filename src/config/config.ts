export const config = {
    database: {
        connection: 'mongodb://localhost:27017/cs-backend',
    },
    port: process.env.port || 3000,
    host: process.env.host || 'http://localhost',

    USER_PASSWORD_BCRYPT_SALT_ROUNDS: 12,
    JWT_SECRET: 'secretKey',

};
