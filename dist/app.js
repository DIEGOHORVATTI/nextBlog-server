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
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _globalErrorHandler = /*#__PURE__*/ _interop_require_default(require("./app/middlewares/globalErrorHandler"));
const _routes = /*#__PURE__*/ _interop_require_default(require("./app/routes"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
app.use((0, _cors.default)({
    origin: 'https://blogplex.vercel.app',
    credentials: true
}));
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
    extended: true
}));
app.use((0, _cookieparser.default)());
app.use('/api/v1', _routes.default);
app.use(_globalErrorHandler.default);
app.get('/', (req, res)=>{
    res.send('BlogPlex server is running!');
});
const _default = app;
