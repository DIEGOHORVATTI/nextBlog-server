"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resetPasswordService", {
    enumerable: true,
    get: function() {
        return resetPasswordService;
    }
});
const _prisma = require("../../../../lib/prisma");
const _error = require("../../../../errors/error");
const _auth = require("../../../../lib/auth");
const resetPasswordService = async ({ email, newPassword, code })=>{
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
    if (!user.resetPassword?.code) {
        throw (0, _error.error)('BAD_REQUEST', {
            error: 'Nenhum código de recuperação foi gerado'
        });
    }
    if (user.resetPassword.code !== code) {
        throw (0, _error.error)('UNAUTHORIZED', {
            error: 'Código inválido'
        });
    }
    if (!user.resetPassword.expires || user.resetPassword.expires < new Date()) {
        throw (0, _error.error)('BAD_REQUEST', {
            error: 'Código expirado'
        });
    }
    const hashedPassword = await (0, _auth.hashPassword)(newPassword);
    await _prisma.prisma.$transaction([
        _prisma.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                password: hashedPassword
            }
        }),
        _prisma.prisma.resetPassword.update({
            where: {
                userId: user.id
            },
            data: {
                code: undefined,
                expires: undefined,
                attempts: 0
            }
        })
    ]);
    return {
        message: 'Senha redefinida com sucesso'
    };
};
