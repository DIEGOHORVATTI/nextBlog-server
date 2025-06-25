"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "recoverPasswordService", {
    enumerable: true,
    get: function() {
        return recoverPasswordService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const _transporter = require("../../../../shared/transporter");
const _server = require("react-dom/server");
const _recoverpasswordemail = /*#__PURE__*/ _interop_require_default(require("../../../../emails/recover-password-email"));
const _config = require("../../../../constants/config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const recoverPasswordService = async ({ email })=>{
    const user = await _prisma.prisma.user.findUnique({
        where: {
            email
        },
        include: {
            resetPassword: true
        }
    });
    if (!user) {
        throw (0, _error.error)('NOT_FOUND', {
            error: 'Usuário não encontrado'
        });
    }
    if (user.resetPassword && user.resetPassword.attempts >= _config.MAX_ATTEMPTS) {
        throw (0, _error.error)('TOO_MANY_REQUESTS', {
            error: 'Número máximo de tentativas de recuperação atingido.'
        });
    }
    const code = Math.floor(100_000 + Math.random() * 900_000).toString();
    const expires = new Date(Date.now() + _config.CODE_EXPIRATION_TIME);
    await _prisma.prisma.resetPassword.upsert({
        where: {
            userId: user.id
        },
        update: {
            code,
            expires,
            attempts: 0
        },
        create: {
            userId: user.id,
            code,
            expires
        }
    });
    const html = (0, _server.renderToStaticMarkup)((0, _recoverpasswordemail.default)({
        code,
        email
    }));
    await _transporter.transporter.sendMail({
        from: _config.MAIL_USERNAME,
        to: email,
        subject: 'Solicitação de redefinição de senha',
        text: `Você solicitou uma redefinição de senha. Use o código abaixo para redefinir sua senha: ${code}`,
        html
    }).catch((err)=>{
        console.error(err);
        throw (0, _error.error)('INTERNAL_SERVER_ERROR', {
            error: 'Falha ao enviar e-mail de recuperação de senha'
        });
    });
};
