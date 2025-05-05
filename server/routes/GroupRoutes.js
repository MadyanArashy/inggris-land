import express from 'express';
import { getGroups, createGroup } from '../controllers/GroupController.js';

const router = express.Router();

router.get('/groups', getGroups); // Route to get all groups
router.post('/groups', createGroup); // Route to create a group

export default router;
