import express from 'express';

import { TagControllers } from './tag.controller';

const router = express.Router();

router.post('/create-tag', TagControllers.addTag);
router.get('/', TagControllers.getAllTags);

export const TagRoutes = router;
