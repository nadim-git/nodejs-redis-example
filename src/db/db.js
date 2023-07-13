const mysql = require('mysql2/promise');
const { redisClient } = require("../db/redis");

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    multipleStatements: true,
});



pool.getConnection().then((connection) => {
    console.log("DB connected...!");
    connection.release(); // Release the connection after use
}).catch((error) => {
    console.log("DB Err : ", error);
    throw error;
});


// Get data using Async await Mysql + NodeJs
getCommon = async (querySql, valuesOne = []) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(querySql, valuesOne);
        connection.release(); // Release the connection after use
        return rows;
    } catch (error) {
        throw error;
    }
};


// handling redis cache storage
const getCommon_redis = async (key, querySql, valuesOne = []) => {
    try {
        // const key = querySql; // Use the querySql as the Redis cache key
        let data = await redisClient.get(key);

        if (!data) {
            console.log("Cache miss, fetching data from MySQL");
            const connection = await pool.getConnection();
            const [rows] = await connection.query(querySql, valuesOne);
            connection.release();
            data = rows;
            // Store the fetched data in Redis cache
            redisClient.set(key, JSON.stringify(data));
        } else {
            console.log("Data retrieved from Redis cache:");
            data = JSON.parse(data);
        }
        return data;
    } catch (error) {
        throw error;
    }
};


module.exports = {
    getCommon,
    getCommon_redis
};

