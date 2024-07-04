import { getDataBaseConnection } from './db';

const create = async ({title, description, status}) => {
  const sql = 'INSERT INTO tasks(title, description, status_id) VALUES ($1,$2, (select id from status where title=$3)) RETURNING id'
  const sqlData = [title, description, status]
  const result = await getDataBaseConnection().query(sql, sqlData)
  return result.rows[0].id
}

const update = async (id, {title, description, status}) => {
  const sql = `update tasks set title=$1, description=$2,
    status_id = (select id from status where title=$3) where id=$4`
  const sqlData = [title, description, status, id]
  const result = await getDataBaseConnection().query(sql, sqlData)
  return result.rows[0]
}

const all = async () => {
  const query = `select t.*, s.title as status from tasks t, status s where t.status_id=s.id`;
  return getDataBaseConnection()
    .query(query)
    .then(({rows}) => rows)
}

const get = (id) => {
  const query = `select * from tasks where id=$1`;
  return getDataBaseConnection()
    .query(query, [id])
    .then(({rows}) => rows[0])
}

const remove = (id) => {
  const query = 'delete from tasks where id=$1';
  return getDataBaseConnection()
    .query(query, [id])
    .then(({rows}) => rows)
}

export default { all, create, get, update, remove };
