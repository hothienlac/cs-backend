export const config = {
    database: {
        connection: 'mongodb+srv://hothienlac:TrucAnhdethuong123%21@hothienlac-r7sjt.mongodb.net/test?retryWrites=true&w=majority',
    },
    port: process.env.port || 3000,
    host: process.env.host || 'http://localhost',
    
    USER_PASSWORD_BCRYPT_SALT_ROUNDS: 12,
	JWT_SECRET: 'secretKey',

}