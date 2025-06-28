const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do List API',
      version: '1.0.0',
      description: 'A simple To-Do List Express API documented with Swagger',
    },
    components: {
      schemas: {
        Task: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Task unique identifier',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Task description/title',
              example: 'Walk the dog'
            },
            completed: {
              type: 'boolean',
              description: 'Whether the task is completed',
              example: false
            }
          },
          required: ['id', 'title', 'completed']
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
