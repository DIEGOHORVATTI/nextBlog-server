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
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _morgan = /*#__PURE__*/ _interop_require_default(require("morgan"));
const _helmet = /*#__PURE__*/ _interop_require_default(require("helmet"));
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _nodepath = require("node:path");
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _expressratelimit = /*#__PURE__*/ _interop_require_default(require("express-rate-limit"));
const _routes = /*#__PURE__*/ _interop_require_default(require("./modules/user/routes"));
const _routes1 = /*#__PURE__*/ _interop_require_default(require("./modules/auth/routes"));
const _routes2 = /*#__PURE__*/ _interop_require_default(require("./modules/post/routes"));
const _exception = /*#__PURE__*/ _interop_require_default(require("./middlewares/exception"));
const _docs = /*#__PURE__*/ _interop_require_default(require("./lib/route-builder/lib/docs"));
const _routes3 = /*#__PURE__*/ _interop_require_default(require("./modules/comment/routes"));
const _timertoseconds = /*#__PURE__*/ _interop_require_default(require("./shared/timer-to-seconds"));
const _routes4 = /*#__PURE__*/ _interop_require_default(require("./modules/category/routes"));
const _config = require("./constants/config");
const _notFound = /*#__PURE__*/ _interop_require_default(require("./middlewares/notFound"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const limiter = (0, _expressratelimit.default)({
    windowMs: (0, _timertoseconds.default)({
        minutes: 15
    }),
    max: 100,
    message: {
        status: 'error',
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false
});
const app = (0, _express.default)();
app.use((0, _helmet.default)({
    contentSecurityPolicy: _config.NODE_ENV === 'development' ? {
        directives: {
            defaultSrc: [
                "'self'"
            ],
            scriptSrc: [
                "'self'",
                "'unsafe-inline'",
                'https://cdn.jsdelivr.net'
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                'https://cdn.jsdelivr.net'
            ],
            imgSrc: [
                "'self'",
                'data:',
                'https://cdn.jsdelivr.net'
            ],
            connectSrc: [
                "'self'",
                'https://cdn.jsdelivr.net'
            ]
        }
    } : undefined
}));
app.set('trust proxy', [
    'loopback',
    'linklocal',
    'uniquelocal'
]);
app.use(_express.default.json({
    limit: '50mb'
}));
app.use(_express.default.urlencoded({
    extended: true
}));
app.use((0, _morgan.default)(':method :url :status :res[content-length] - :response-time ms'));
app.use(limiter);
app.use((0, _cookieparser.default)());
app.use((0, _cors.default)({
    origin: '*',
    methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'OPTIONS'
    ],
    allowedHeaders: [
        'Content-Type',
        'Authorization'
    ],
    credentials: true
}));
app.get('/', (_req, res)=>{
    res.send('API is running 🚀');
});
app.get('/openapi.json', (_req, res)=>{
    res.json((0, _docs.default)({
        openapi: '3.1.0',
        info: {
            title: _config.APP_NAME,
            version: _config.VERSION
        }
    }));
});
app.get('/docs', (_req, res)=>{
    res.sendFile((0, _nodepath.join)(__dirname, 'public/docs.html'));
});
app.use(_routes1.default);
app.use(_routes.default);
app.use(_routes4.default);
app.use(_routes3.default);
app.use(_routes2.default);
app.use(_notFound.default);
app.use(_exception.default);
app.listen(_config.PORT, ()=>{
    console.log(`\n  Server is running at port http://localhost:${_config.PORT}`);
});
const _default = app;
