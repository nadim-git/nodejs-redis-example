
const { redisClient } = require("../db/redis");

const getOrFetchData = async (key, query) => {
    // Retrieve data from Redis cache
    let data = await redisClient.get(key);

    if (!data) {
        console.log("Cache miss, fetching data from MySQL");
        data = await getCommon(query);

        // Store the fetched data in Redis cache
        redisClient.set(key, JSON.stringify(data));
    } else {
        console.log("Data retrieved from Redis cache:", data);
        data = JSON.parse(data);
    }

    return data;
};

module.exports = {
    getOrFetchData
}