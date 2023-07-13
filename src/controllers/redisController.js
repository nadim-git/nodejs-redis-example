const { getCommon, getCommon_redis } = require("../db/db");

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

module.exports = {
    getDatas,
};

