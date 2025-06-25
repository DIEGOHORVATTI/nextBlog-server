"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get APP_NAME () {
        return _packagejson.name;
    },
    get CODE_EXPIRATION_TIME () {
        return CODE_EXPIRATION_TIME;
    },
    get EMAIL_CONTACT () {
        return EMAIL_CONTACT;
    },
    get HTTP_ONLY_COOKIE () {
        return HTTP_ONLY_COOKIE;
    },
    get JWT_ALGORITHM () {
        return JWT_ALGORITHM;
    },
    get JWT_EXPIRES_IN_DAYS () {
        return JWT_EXPIRES_IN_DAYS;
    },
    get JWT_SECRET () {
        return JWT_SECRET;
    },
    get MAIL_HOST () {
        return MAIL_HOST;
    },
    get MAIL_PASSWORD () {
        return MAIL_PASSWORD;
    },
    get MAIL_PORT () {
        return MAIL_PORT;
    },
    get MAIL_USERNAME () {
        return MAIL_USERNAME;
    },
    get MAX_ATTEMPTS () {
        return MAX_ATTEMPTS;
    },
    get NEXT_PUBLIC_SUPABASE_ANON_KEY () {
        return NEXT_PUBLIC_SUPABASE_ANON_KEY;
    },
    get NEXT_PUBLIC_SUPABASE_URL () {
        return NEXT_PUBLIC_SUPABASE_URL;
    },
    get NODE_ENV () {
        return NODE_ENV;
    },
    get PORT () {
        return PORT;
    },
    get POSTGRES_DATABASE () {
        return POSTGRES_DATABASE;
    },
    get POSTGRES_HOST () {
        return POSTGRES_HOST;
    },
    get POSTGRES_PASSWORD () {
        return POSTGRES_PASSWORD;
    },
    get POSTGRES_PRISMA_URL () {
        return POSTGRES_PRISMA_URL;
    },
    get POSTGRES_URL () {
        return POSTGRES_URL;
    },
    get POSTGRES_URL_NON_POOLING () {
        return POSTGRES_URL_NON_POOLING;
    },
    get POSTGRES_USER () {
        return POSTGRES_USER;
    },
    get SAME_SITE_COOKIE () {
        return SAME_SITE_COOKIE;
    },
    get SECURE_COOKIE () {
        return SECURE_COOKIE;
    },
    get SUPABASE_JWT_SECRET () {
        return SUPABASE_JWT_SECRET;
    },
    get SUPABASE_SERVICE_ROLE_KEY () {
        return SUPABASE_SERVICE_ROLE_KEY;
    },
    get SUPABASE_URL () {
        return SUPABASE_URL;
    },
    get VERSION () {
        return _packagejson.version;
    },
    get WEB_URL () {
        return WEB_URL;
    }
});
const _timertoseconds = /*#__PURE__*/ _interop_require_default(require("../shared/timer-to-seconds"));
const _packagejson = require("../../package.json");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PORT = process.env.PORT || '8000';
const NODE_ENV = process.env.NODE_ENV || 'development';
const WEB_URL = process.env.WEB_URL || '';
const CODE_EXPIRATION_TIME = (0, _timertoseconds.default)({
    minutes: Number(process.env.CODE_EXPIRATION_TIME) || 15
});
const HTTP_ONLY_COOKIE = true;
const SECURE_COOKIE = NODE_ENV === 'production';
const SAME_SITE_COOKIE = 'lax';
const MAX_ATTEMPTS = 5;
const EMAIL_CONTACT = process.env.EMAIL_CONTACT || '';
const POSTGRES_URL = process.env.POSTGRES_URL || '';
const POSTGRES_PRISMA_URL = process.env.POSTGRES_PRISMA_URL || '';
const POSTGRES_URL_NON_POOLING = process.env.POSTGRES_URL_NON_POOLING || '';
const POSTGRES_USER = process.env.POSTGRES_USER || '';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || '';
const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_JWT_SECRET = process.env.SUPABASE_JWT_SECRET || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const NEXT_PUBLIC_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const JWT_EXPIRES_IN_DAYS = process.env.JWT_EXPIRES_IN_DAYS || '7d';
const JWT_SECRET = process.env.JWT_SECRET || '';
const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
const MAIL_HOST = process.env.MAIL_HOST || '';
const MAIL_PORT = Number(process.env.MAIL_PORT || 587);
const MAIL_USERNAME = process.env.MAIL_USERNAME || '';
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';
