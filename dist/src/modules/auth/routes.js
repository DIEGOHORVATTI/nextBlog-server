"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _routebuilder = require("../../lib/route-builder");
const _config = require("../../constants/config");
const _service = require("./use-cases/login/service");
const _schema = require("./use-cases/login/schema");
const _service1 = require("./use-cases/register/service");
const _schema1 = require("./use-cases/register/schema");
const _schema2 = require("./use-cases/verify-code/schema");
const _service2 = require("./use-cases/verify-code/service");
const _schema3 = require("./use-cases/reset-password/schema");
const _service3 = require("./use-cases/reset-password/service");
const _schema4 = require("./use-cases/recover-password/schema");
const _service4 = require("./use-cases/recover-password/service");
const authRouter = new _routebuilder.RouteBuilder().group({
    prefix: '/auth',
    tags: [
        'Auth'
    ]
});
const COOKIE_NAME = 'token';
const cookieOptions = {
    httpOnly: _config.HTTP_ONLY_COOKIE,
    secure: _config.SECURE_COOKIE,
    sameSite: _config.SAME_SITE_COOKIE
};
authRouter.post('/login', async ({ body }, res)=>{
    const { user, token } = await (0, _service.login)(body);
    res.cookie(COOKIE_NAME, token, cookieOptions);
    return res.status(200).json({
        user
    });
}, {
    body: _schema.loginSchema,
    description: 'Realiza o login do usuário'
});
authRouter.post('/register', async ({ body }, res)=>{
    const { user, token } = await (0, _service1.register)(body);
    res.cookie(COOKIE_NAME, token, cookieOptions);
    return res.status(201).json({
        user
    });
}, {
    description: 'Registra um novo usuário',
    body: _schema1.registerUserSchema
});
authRouter.get('/logout', async (req, res)=>{
    res.clearCookie(COOKIE_NAME, cookieOptions);
    return res.status(204).send();
});
authRouter.post('/recover-password', async ({ body })=>{
    await (0, _service4.recoverPasswordService)(body);
    return {
        message: 'Código de recuperação enviado para o e-mail'
    };
}, {
    body: _schema4.recoverPasswordSchema,
    description: 'Envia código de recuperação de senha'
});
authRouter.post('/verify-code', async ({ body })=>(0, _service2.verifyCodeService)(body), {
    description: 'Verifica o código de recuperação de senha',
    body: _schema2.verifyCodeSchema
});
authRouter.post('/reset-password', async ({ body })=>(0, _service3.resetPasswordService)(body), {
    body: _schema3.resetPasswordSchema,
    description: 'Redefine a senha do usuário'
});
const _default = authRouter.export();
