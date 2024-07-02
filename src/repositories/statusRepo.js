import { getDataBaseConnection } from './db';

const all = async () => {
  const query = `select * from status`;
  return getDataBaseConnection()
    .query(query)
    .then(({rows}) => rows)
}

export default { all };
