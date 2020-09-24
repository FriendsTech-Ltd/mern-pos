import express from 'express';

import { test } from '../controllers/testController';

const router = express.Router();

router.route('/').get(test);

export default router;
