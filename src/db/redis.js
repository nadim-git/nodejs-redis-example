const redis = require('redis');

const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD

});


redisClient.connect().catch(console.error)

redisClient.on('connect', () => {
    console.log('Redis client connected');
});

redisClient.on('error', (error) => {
    console.error('Redis error:', error);
});

module.exports = {
    redisClient,
};