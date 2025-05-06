import express from 'express';
import { getGroups, createGroup, getGroupById, updateGroup, deleteGroup } from '../controllers/GroupController.js';

const router = express.Router();

router.get('/groups', getGroups); // Route to get all groups
router.get('/groups/:id', getGroupById); // Route to get all groups
router.post('/groups', createGroup); // Route to create a group
router.put('/groups/:id', updateGroup); // Route to update a group
router.delete('/groups/:id', deleteGroup); // Route to update a group

export default router;
