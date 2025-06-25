"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return RecoverPasswordEmail;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _components = require("@react-email/components");
function RecoverPasswordEmail({ code, email }) {
    const yearNow = new Date().getFullYear();
    const recoverPasswordHeading = /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Heading, {
        style: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#10b981',
            textAlign: 'center',
            marginBottom: '10px'
        },
        children: "Azeplast"
    });
    const recoverPasswordSection = /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Section, {
        style: {
            padding: '20px 0'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Container, {
            style: {
                backgroundColor: '#d1fae5',
                borderRadius: '8px',
                textAlign: 'center',
                padding: '15px 0'
            },
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Text, {
                style: {
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: '#10b981',
                    textAlign: 'center'
                },
                children: code
            })
        })
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Tailwind, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.Container, {
            style: {
                padding: '20px 0',
                minHeight: '100vh'
            },
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.Container, {
                    style: {
                        maxWidth: '600px',
                        borderRadius: '10px',
                        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                        padding: '30px',
                        margin: '0 auto'
                    },
                    children: [
                        recoverPasswordHeading,
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.Text, {
                            style: {
                                color: '#6b7280',
                                fontSize: '14px',
                                lineHeight: '1.5'
                            },
                            children: [
                                "Olá, ",
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("br", {}),
                                "Recebemos uma solicitação para redefinir a senha associada ao e-mail ",
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("b", {
                                    children: email
                                }),
                                "."
                            ]
                        }),
                        recoverPasswordSection,
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Text, {
                            style: {
                                color: '#6b7280',
                                fontSize: '14px',
                                lineHeight: '1.5'
                            },
                            children: "Não compartilhe este código com ninguém."
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Text, {
                            style: {
                                marginTop: '10px',
                                color: '#6b7280',
                                fontSize: '14px',
                                lineHeight: '1.5'
                            },
                            children: "Se você não solicitou uma redefinição de senha, ignore este e-mail."
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Text, {
                            style: {
                                color: '#6b7280',
                                fontSize: '14px',
                                lineHeight: '1.5'
                            },
                            children: "— A equipe da Azeplast"
                        })
                    ]
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Hr, {
                    style: {
                        margin: '20px 0',
                        borderColor: '#d1d5db'
                    }
                }),
                /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.Text, {
                    style: {
                        fontSize: '12px',
                        color: '#9ca3af',
                        textAlign: 'center'
                    },
                    children: [
                        "© ",
                        yearNow,
                        " Azeplast Indústria e Comércio LTDA. Todos os direitos reservados."
                    ]
                })
            ]
        })
    });
}
RecoverPasswordEmail.PreviewProps = {
    code: '123456',
    email: 'email@email.com'
};
