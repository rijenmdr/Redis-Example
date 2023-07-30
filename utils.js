


module.exports.getOrSetCache = (key, cb) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async(error, data) => {
            if(error) return reject(error);

            if(data !== null) return resolve(JSON.parse(data));

            const responseData = await cb();
            redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(responseData));
            return resolve(responseData);
        })
    })
}