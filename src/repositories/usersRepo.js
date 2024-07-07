import { getDataBaseConnection } from './db';

const create = async (user) => {
  const insertQuery = `INSERT INTO users(name, password, role_id)
   values ($1, crypt($2, gen_salt('bf')), (SELECT id from roles where name=$3)) RETURNING id;`
  const values = [user.name, user.password, user.role];
  const {rows: [{id}]} = await query(insertQuery, values);
  return id;
};

const getUser  = async (name, password) => {
  const query = `SELECT u.id, u.name from users u where u.name='${name}'
   and u.password = crypt('${password}', u.password)`;
  return getDataBaseConnection()
    .query(query)
    .then(({rows}) => rows[0])
}

const getById  = async (id) => {
  const query = `SELECT u.id, u.name from users u where u.id='${id}'`;
  return getDataBaseConnection()
    .query(query)
    .then(({rows}) => rows[0])
}

export default { getUser, getById };
