const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class UserService {
  constructor() { }

  async create(data) {
    return data;
  }

  async find() {
    const client = await getConnection();
    const rta = await client.query(`
    SELECT table_schema, table_name
    FROM information_schema.tables
    WHERE table_type = 'BASE TABLE'
    ORDER BY table_schema, table_name;
  `);
    return rta.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
