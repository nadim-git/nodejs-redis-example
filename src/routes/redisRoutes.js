const router = require("express").Router();
const {
    getDatas,
} = require("../controllers/redisController");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const methodErrRes = () => {
    return (req, res) => {
        res.status(405).send({
            status: " error",
            message: "This method is not available",
        });
    };
};

// Add & Update item
router
    .get("/redis-get", getDatas)
    .all("/redis-get", methodErrRes());




// Exporting router
module.exports = router;
