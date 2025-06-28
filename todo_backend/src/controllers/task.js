//
// Controllers for task endpoints: CRUD logic, validation, error handling
//
const taskService = require('../services/task');

class TaskController {
  // PUBLIC_INTERFACE
  /**
   * Handle GET /tasks (optionally filter by completed status)
   */
  getTasks(req, res) {
    const { filter } = req.query;
    let filterOpt = 'all';
    if (filter === 'completed' || filter === 'pending') {
      filterOpt = filter;
    }
    const tasks = taskService.getTasks(filterOpt);
    return res.status(200).json(tasks);
  }

  // PUBLIC_INTERFACE
  /**
   * Handle POST /tasks - add a new task with validation
   */
  createTask(req, res) {
    const { title } = req.body;
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Task title is required and must be a non-empty string.'
      });
    }
    const task = taskService.createTask(title.trim());
    return res.status(201).json(task);
  }

  // PUBLIC_INTERFACE
  /**
   * Handle PATCH /tasks/:id - mark as complete/incomplete or edit title
   */
  updateTask(req, res) {
    const { id } = req.params;
    let numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid task id.'
      });
    }
    const { completed, title } = req.body;

    // Validate input
    if (typeof completed !== 'undefined' && typeof completed !== 'boolean') {
      return res.status(400).json({
        status: 'error',
        message: '`completed` must be a boolean value.'
      });
    }
    if (typeof title !== 'undefined' && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({
        status: 'error',
        message: '`title` must be a non-empty string if specified.'
      });
    }

    const changes = {};
    if (typeof completed === 'boolean') changes.completed = completed;
    if (typeof title === 'string' && title.trim()) changes.title = title.trim();

    const task = taskService.updateTask(numericId, changes);
    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found.'
      });
    }
    return res.status(200).json(task);
  }

  // PUBLIC_INTERFACE
  /**
   * Handle DELETE /tasks/:id - delete a task
   */
  deleteTask(req, res) {
    const { id } = req.params;
    let numericId = Number(id);
    if (!Number.isInteger(numericId) || numericId < 1) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid task id.'
      });
    }
    const ok = taskService.deleteTask(numericId);
    if (!ok) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not found.'
      });
    }
    return res.status(204).send();
  }
}

module.exports = new TaskController();

