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
const _auth = require("../../middlewares/auth");
const _routebuilder = require("../../lib/route-builder");
const _schema = require("./use-cases/update/schema");
const _service = require("./use-cases/update/service");
const _service1 = require("./use-cases/get-one/service");
const userRouter = new _routebuilder.RouteBuilder().use(_auth.auth).group({
    prefix: '/user',
    tags: [
        'User'
    ]
});
userRouter.get('/me', async ({ user: { id } }, res)=>{
    const user = await (0, _service1.getUserByIdService)(id);
    if (!user) return res.status(404).json({
        error: 'User not found'
    });
    return res.json(user);
}, {
    description: 'Retorna os dados do usuário autenticado'
});
userRouter.get('/:id', async ({ params: { id } }, res)=>{
    const userData = await (0, _service1.getUserByIdService)(id);
    if (!userData) return res.status(404).json({
        error: 'User not found'
    });
    return res.json(userData);
}, {
    description: 'Retorna os dados de um usuário pelo ID'
});
userRouter.put('/me', async ({ body, user: { id } })=>{
    const updatedUser = await (0, _service.updateUserService)(id, body);
    return {
        updatedUser
    };
}, {
    body: _schema.updateUserSchema,
    description: 'Atualiza os dados do usuário autenticado'
});
const _default = userRouter.export();
