const { getCommon, getCommon_redis } = require("../db/db");
const DateTime = require("date-and-time");
const { deleteRedisKey } = require('../utils/common_function')


const addUpdateCurrency = async (req, res, next) => {
    try {
        const { id, currency_name, currency_code, symbol, status } = req.body;
        let qry;
        let msg;
        let now = DateTime.format(new Date(), "YYYY-MM-DD hh:mm:ss");

        if (id && id !== undefined) {
            qry = `UPDATE currency_master SET status = ?, currency_name = ?, currency_code = ?, symbol = ?, updated_at = ? WHERE id = '${id}'`;
            msg = "Data updated successfully";
        } else {
            qry = `INSERT INTO currency_master (status, currency_name, currency_code, symbol, created_at) VALUES (?, ?, ?, ?, ?)`;
            msg = "Data inserted successfully";
        }

        const values = [status, currency_name, currency_code, symbol, now];

        const rows = await getCommon(qry, values);

        if (rows.affectedRows) {
            // Update the corresponding Redis cache key
            await deleteRedisKey("currency_master")

            return res.send({
                status: "success",
                message: msg,
            });
        }
    } catch (error) {
        return res.send({
            status: "error",
            message: error.message,
        });
    }
};


const getDatas = async (req, res, next) => {
    try {
        const querySql = 'SELECT * FROM currency_master'; // Replace with your desired SQL query
        // Call the updated getCommon function to retrieve data
        const responseArray = await getCommon_redis("currency_master", querySql);

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
    addUpdateCurrency
};

