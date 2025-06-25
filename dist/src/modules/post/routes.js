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
const _result = require("../../lib/result");
const _schema = require("./use-cases/get-all/schema");
const _schema1 = require("./use-cases/create/schema");
const _service = require("./use-cases/get-one/service");
const _service1 = require("./use-cases/get-all/service");
const _service2 = require("./use-cases/create/service");
const _service3 = require("./use-cases/update/service");
const _service4 = require("./use-cases/delete/service");
const postRouter = new _routebuilder.RouteBuilder().group({
    prefix: '/posts',
    tags: [
        'Posts'
    ]
}).use(_auth.auth);
postRouter.post('/', async ({ body, user }, res)=>{
    const post = await (0, _service2.createPostService)(user.id, body);
    return res.status(201).json(post);
}, {
    body: _schema1.createPostSchema,
    description: 'Create a new post'
});
postRouter.get('/', async ({ query }, res)=>{
    const posts = await (0, _service1.getPostsService)(query);
    return res.json(posts);
}, {
    query: _schema.getPostsSchema,
    description: 'Get all posts with pagination and filters'
});
postRouter.get('/:id', async ({ params }, res)=>{
    const post = await (0, _service.getPostService)(params.id);
    if (!post) return (0, _result.error)('NOT_FOUND', 'Post not found');
    return res.json(post);
}, {
    description: 'Get a post by ID'
});
postRouter.put('/:id', async ({ params, body, user }, res)=>{
    const post = await (0, _service3.updatePostService)(params.id, user.id, body);
    return res.json(post);
}, {
    description: 'Update a post'
});
postRouter.delete('/:id', async ({ params: { id }, user }, res)=>{
    const result = await (0, _service4.deletePostService)(id, user.id);
    return res.status(204).send(result);
}, {
    description: 'Delete a post'
});
const _default = postRouter.export();
