"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return WelcomeEmail;
    }
});
const _jsxruntime = require("react/jsx-runtime");
const _config = require("../constants/config");
const _components = require("@react-email/components");
function WelcomeEmail({ name, markdown }) {
    const yearNow = new Date().getFullYear();
    const header = /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Heading, {
        style: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1d4ed8',
            textAlign: 'center',
            marginBottom: '10px'
        },
        children: "Bem-vindo à Intranet Azeplast"
    });
    const accessButton = /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Section, {
        style: {
            textAlign: 'center',
            padding: '20px 0'
        },
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Button, {
            href: _config.WEB_URL,
            style: {
                backgroundColor: '#1d4ed8',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '16px'
            },
            children: "Acessar a plataforma"
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
                        header,
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.Text, {
                            style: {
                                color: '#6b7280',
                                fontSize: '16px',
                                lineHeight: '1.5'
                            },
                            children: [
                                "Olá, ",
                                name,
                                ","
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Markdown, {
                            children: markdown
                        }),
                        accessButton,
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.Text, {
                            style: {
                                color: '#6b7280',
                                fontSize: '16px',
                                lineHeight: '1.5'
                            },
                            children: [
                                "Em caso de dúvidas, fale com o time responsável pelo e-mail",
                                ' ',
                                /*#__PURE__*/ (0, _jsxruntime.jsx)(_components.Link, {
                                    href: `mailto:${_config.EMAIL_CONTACT}`,
                                    style: {
                                        color: '#1d4ed8'
                                    },
                                    children: _config.EMAIL_CONTACT
                                }),
                                "."
                            ]
                        }),
                        /*#__PURE__*/ (0, _jsxruntime.jsxs)(_components.Text, {
                            style: {
                                color: '#6b7280',
                                fontSize: '16px',
                                lineHeight: '1.5'
                            },
                            children: [
                                "Atenciosamente, ",
                                /*#__PURE__*/ (0, _jsxruntime.jsx)("br", {}),
                                " Equipe Azeplast"
                            ]
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
WelcomeEmail.PreviewProps = {
    name: 'Fulano da Silva',
    markdown: `
## Seja bem-vindo à Intranet

Você já pode explorar os recursos internos da Azeplast, como documentos, avisos e ferramentas.

- Use seu login corporativo
- Atualize suas informações
- Acompanhe comunicados internos

Estamos felizes em ter você aqui!
`
};
