import { Pool } from 'pg'
import { parse } from 'pg-connection-string'

const config = parse(process.env.DATABASE_URL)

config.ssl = {
    rejectUnauthorized: false
}

config.ssl = false

const pool = new Pool(config)
const getDataBaseConnection = () => pool

export { getDataBaseConnection };
