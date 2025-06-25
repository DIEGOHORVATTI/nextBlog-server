"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "verifyCodeService", {
    enumerable: true,
    get: function() {
        return verifyCodeService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const _config = require("../../../../constants/config");
const verifyCodeService = async ({ email, code })=>{
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
    const { resetPassword } = user;
    if (!resetPassword || !resetPassword.code) {
        throw (0, _error.error)('BAD_REQUEST', {
            error: 'Nenhum código de recuperação foi gerado'
        });
    }
    if (resetPassword.attempts >= _config.MAX_ATTEMPTS) {
        throw (0, _error.error)('TOO_MANY_REQUESTS', {
            error: 'Número máximo de tentativas de verificação atingido'
        });
    }
    if (!resetPassword.expires || resetPassword.expires < new Date()) {
        throw (0, _error.error)('BAD_REQUEST', {
            error: 'Código expirado'
        });
    }
    if (resetPassword.code !== code) {
        await _prisma.prisma.resetPassword.update({
            where: {
                userId: user.id
            },
            data: {
                attempts: resetPassword.attempts + 1
            }
        });
        throw (0, _error.error)('UNAUTHORIZED', {
            error: 'Código inválido'
        });
    }
    return {
        message: 'Código verificado com sucesso'
    };
};
