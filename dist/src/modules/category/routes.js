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
const _schema = require("./use-cases/create/schema");
const _schema1 = require("./use-cases/update/schema");
const _service = require("./use-cases/get-one/service");
const _service1 = require("./use-cases/create/service");
const _service2 = require("./use-cases/update/service");
const _service3 = require("./use-cases/delete/service");
const _service4 = require("./use-cases/get-all/service");
const categoryRouter = new _routebuilder.RouteBuilder().group({
    prefix: '/category',
    tags: [
        'Category'
    ]
}).use(_auth.auth);
categoryRouter.post('/', async ({ body }, res)=>{
    const category = await (0, _service1.createCategoryService)(body);
    return res.status(201).json(category);
}, {
    body: _schema.createCategorySchema,
    description: 'Create a new category'
});
categoryRouter.get('/', async (req, res)=>{
    const categories = await (0, _service4.getCategoriesService)();
    return res.json(categories);
}, {
    description: 'Get all categories'
});
categoryRouter.get('/:id', async ({ params }, res)=>{
    const category = await (0, _service.getCategoryService)(params.id);
    if (!category) return res.status(404).json({
        error: 'Category not found'
    });
    return res.json(category);
}, {
    description: 'Get a category by ID'
});
categoryRouter.put('/:id', async ({ params: { id }, body }, res)=>{
    const category = await (0, _service2.updateCategoryService)(id, body);
    return res.json(category);
}, {
    body: _schema1.updateCategorySchema,
    description: 'Update a category'
});
categoryRouter.delete('/:id', async ({ params: { id } }, res)=>{
    await (0, _service3.deleteCategoryService)(id);
    return res.status(204).json({
        message: 'Category deleted successfully'
    });
}, {
    description: 'Delete a category'
});
const _default = categoryRouter.export();
