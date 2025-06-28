//
// Service layer for managing in-memory tasks for To-Do App
//
let currentId = 1;
// In-memory tasks array
const tasks = [];

class TaskService {
  // PUBLIC_INTERFACE
  /**
   * Create a new task
   * @param {string} title - The task title
   * @returns {object} The created task
   */
  createTask(title) {
    const task = {
      id: currentId++,
      title: title,
      completed: false
    };
    tasks.push(task);
    return task;
  }

  // PUBLIC_INTERFACE
  /**
   * Get tasks (optionally filtered by completion)
   * @param {string} filter - 'all', 'completed', 'pending'
   * @returns {Array} The list of tasks
   */
  getTasks(filter = 'all') {
    if (filter === 'completed') {
      return tasks.filter(t => t.completed);
    }
    if (filter === 'pending') {
      return tasks.filter(t => !t.completed);
    }
    return tasks;
  }

  // PUBLIC_INTERFACE
  /**
   * Get a single task by ID
   * @param {number} id - task id
   * @returns {object|null} The task or null
   */
  getTaskById(id) {
    return tasks.find(t => t.id === id) || null;
  }

  // PUBLIC_INTERFACE
  /**
   * Update a task (complete/un-complete, title)
   * @param {number} id - task id
   * @param {object} changes - fields to update ({completed, title})
   * @returns {object|null} The updated task or null
   */
  updateTask(id, changes) {
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    if (typeof changes.completed !== 'undefined')
      task.completed = !!changes.completed;
    if (typeof changes.title === 'string')
      task.title = changes.title;
    return task;
  }

  // PUBLIC_INTERFACE
  /**
   * Remove (delete) a task by its ID
   * @param {number} id - task id
   * @returns {boolean} True if removed, false if not found
   */
  deleteTask(id) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  }
}

module.exports = new TaskService();

