"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transporter", {
    enumerable: true,
    get: function() {
        return transporter;
    }
});
const _nodemailer = /*#__PURE__*/ _interop_require_default(require("nodemailer"));
const _config = require("../constants/config");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const transporter = _nodemailer.default.createTransport({
    host: _config.MAIL_HOST,
    port: _config.MAIL_PORT,
    secure: _config.MAIL_PORT === 465,
    auth: {
        user: _config.MAIL_USERNAME,
        pass: _config.MAIL_PASSWORD
    }
});
