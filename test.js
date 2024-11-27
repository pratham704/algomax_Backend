import { getConnection } from "./config/database.js";

const connection = await getConnection();

const [result] = await connection.execute('truncate table events;');

console.log(result);