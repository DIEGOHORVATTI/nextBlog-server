"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = /*#__PURE__*/ _interop_require_default(require("./app"));
const _config = /*#__PURE__*/ _interop_require_default(require("./config/config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let server;
async function main() {
    server = _app.default.listen(_config.default.port, ()=>{
        console.log(`🚀 Server ready at: http://localhost:${_config.default.port} and the process id is ${process.pid}`);
    });
}
const exitHandler = ()=>{
    if (server) {
        server.close(()=>{
            console.info('Server is shutting down');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error)=>{
    console.log(error);
    exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
/* 
this will get fired upon stopping server by pressing ctrl + c
process.on('SIGINT', () => {
   console.log('SIGINT signal received');
   unexpectedErrorHandler('SIGINT signal received');
}); 
*/ process.on('SIGTERM', ()=>{
    console.info('SIGTERM signal received');
    unexpectedErrorHandler('SIGTERM signal received');
});
main();
