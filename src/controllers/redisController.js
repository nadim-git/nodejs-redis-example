const { getCommon, getCommon_redis } = require("../db/db");





// const getDatas = async (req, res, next) => {
//     try {
//         const keyname = "citymaster_data";
//         // Retrieve data from Redis cache or fetch from MySQL
//         const responseArray = await getOrFetchData(keyname, 'SELECT * FROM banner_master');
//         return res.send({
//             status: 'success',
//             data: responseArray,
//         });
//     } catch (error) {
//         console.error("API error:", error);
//         return res.send({
//             status: 'error',
//             message: error.message,
//         });
//     }
// };

const getDatas = async (req, res, next) => {
    try {
        const querySql = 'SELECT * FROM banner_master'; // Replace with your desired SQL query
        // Call the updated getCommon function to retrieve data
        const responseArray = await getCommon_redis("banner_master", querySql);

        return res.send({
            status: 'success',
            data: responseArray,
        });
    } catch (error) {
        console.error("API error:", error);
        return res.send({
            status: 'error',
            message: error.message,
        });
    }
};

module.exports = {
    getDatas,
};


// const getDatas = async (req, res, next) => {
//     try {
//         const keyname = "citymaster_data";

//         // Retrieve data from Redis cache
//         const cachedData = await new Promise((resolve, reject) => {
//             redisClient.get(keyname, (error, data) => {
//                 if (error) {
//                     console.error("Redis cache retrieval error:", error);
//                     reject(error);
//                 } else {
//                     resolve(data);
//                 }
//             });
//         });

//         if (cachedData) {
//             // Data found in Redis cache, parse and return it
//             const responseData = JSON.parse(cachedData);
//             console.log("Data retrieved from Redis cache:", responseData);
//             res.json({
//                 status: "success",
//                 data: responseData,
//             });
//         } else {
//             console.log("Cache miss, fetching data from MySQL");

//             // Fetch data from MySQL
//             const data = await getCommon('SELECT * FROM city_master');
//             console.log("Data fetched from MySQL:", data);

//             if (data) {
//                 // Store the fetched data in Redis cache
//                 redisClient.set(keyname, JSON.stringify(data), (error) => {
//                     if (error) {
//                         console.error("Redis cache set error:", error);
//                     }
//                 });

//                 res.json({
//                     status: "success",
//                     data: data,
//                 });
//             } else {
//                 res.status(404).json({
//                     status: "error",
//                     message: "Data not found",
//                 });
//             }
//         }
//     } catch (error) {
//         console.error("API error:", error);
//         res.status(500).json({
//             status: "error",
//             message: "Internal server error",
//         });
//     }
// };




module.exports = {
    getDatas,
};