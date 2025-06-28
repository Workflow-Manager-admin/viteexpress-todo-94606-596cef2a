/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management endpoints
 */

const express = require('express');
const taskController = require('../controllers/task');

const router = express.Router();

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks (optionally filter by completion)
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [all, completed, pending]
 *         description: Filter tasks by status
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', taskController.getTasks.bind(taskController));

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 description: Task description/title
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 */
router.post('/', taskController.createTask.bind(taskController));

/**
 * @swagger
 * /tasks/{id}:
 *   patch:
 *     summary: Update a task (mark completed/pending, edit title)
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     requestBody:
 *       description: Changes to apply
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Task not found
 */
router.patch('/:id', taskController.updateTask.bind(taskController));

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task ID
 *     responses:
 *       204:
 *         description: Task deleted
 *       400:
 *         description: Invalid task ID
 *       404:
 *         description: Task not found
 */
router.delete('/:id', taskController.deleteTask.bind(taskController));

module.exports = router;

