import mysql from "promise-mysql";

function openConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: '1234',
        database: 'notedb',
        port: '3307'
    });
}

async function executeWithResult(query, ...params) {
    const conn = await openConnection();                                            //open a new connection
    const results = await conn.query(query, params).then(convertToJsonObject);      //execute the query with the given parameters and convert the result
    conn.end();                                                                     //close the connection, important to avoid DDOS attacks
    return results;
}

async function executeWithoutResult(query, ...params) {
    const conn = await openConnection();                //open a new connection
    const result = await conn.query(query, params);     //execute the query with the given parameters
    conn.end();
    return result.affectedRows;                         //used to check if the query succeeded
}

function convertToJsonObject(sqlResult) {
    return sqlResult.map(row => Object.fromEntries(Object.entries(row)));
}

export { executeWithResult, executeWithoutResult };
