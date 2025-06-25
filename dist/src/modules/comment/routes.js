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
const _schema = require("../../shared/paginate/schema");
const _schema1 = require("./use-cases/create/schema");
const _schema2 = require("./use-cases/update/schema");
const _schema3 = require("./use-cases/delete/schema");
const _service = require("./use-cases/get-all/service");
const _service1 = require("./use-cases/create/service");
const _service2 = require("./use-cases/update/service");
const _service3 = require("./use-cases/delete/service");
const commentRouter = new _routebuilder.RouteBuilder().group({
    prefix: '/comments',
    tags: [
        'Comments'
    ]
}).use(_auth.auth);
commentRouter.post('/', async ({ body, user }, res)=>{
    const comment = await (0, _service1.createCommentService)(user.id, body);
    return res.status(201).json(comment);
}, {
    body: _schema1.createCommentSchema,
    description: 'Create a new comment'
});
commentRouter.get('/post/:postId', async ({ params, query }, res)=>{
    const comments = await (0, _service.getCommentsService)(params.postId, query);
    return res.json(comments);
}, {
    query: _schema.paginationSchema,
    description: 'Get comments for a specific post'
});
commentRouter.put('/:id', async ({ params: { id }, body, user }, res)=>{
    const comment = await (0, _service2.updateCommentService)(id, body, user.id);
    return res.json(comment);
}, {
    body: _schema2.updateCommentSchema,
    description: 'Update a comment'
});
commentRouter.delete('/:id', async ({ params, user }, res)=>{
    await (0, _service3.deleteCommentService)(params.id, user.id);
    return res.status(204).send();
}, {
    body: _schema3.deleteCommentSchema,
    description: 'Delete a comment'
});
const _default = commentRouter.export();
