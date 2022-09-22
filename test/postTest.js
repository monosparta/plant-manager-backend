import models from '../src/db/models';

// Close sequelize connection after test
afterAll(() => models.sequelize.close());
