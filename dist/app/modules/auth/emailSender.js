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
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
const _config = /*#__PURE__*/ _interop_require_default(require("../../../config/config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const emailSender = async (receiverEmail, html)=>{
    const transporter = _nodemailer.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: _config.default.sender_email,
            pass: _config.default.app_password
        }
    });
    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"NextBlog" <saifulislamweb87@gmail.com>',
        to: receiverEmail,
        subject: 'Reset Password Link',
        //   text: 'Hello world?', // plain text body
        html
    });
    console.log('Message sent: %s', info.messageId);
};
const _default = emailSender;
