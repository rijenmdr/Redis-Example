const express = require("express");
const axios = require('axios');
const Redis = require('redis');
let redisClient;

(async () => {
    redisClient = Redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();
const app = express();
const port = 3000;

const DEFAULT_EXPIRATION = 3600;


app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '100mb' }));

app.get('/api/photos', async (req, res) => {
    const { albumId } = req.query
    try {
        const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', {
                params: { albumId }
            });
            return data
        });

        return res.json(photos)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: err
        })
    }
});

app.get('/api/photos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const photo = await getOrSetCache(`photos/${id}`, async () => {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
            return data
        });

        return res.json(photo)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: err
        })
    }
});


const getOrSetCache = async (key, cb) => {
    try {
        const data = await redisClient.get(key);

        if (data !== null) return JSON.parse(data);

        const responseData = await cb();
        redisClient.setEx(key, DEFAULT_EXPIRATION, JSON.stringify(responseData));
        return responseData;
    } catch (err) {
        return Promise.reject(err);
    }
}

app.listen(port, () => {
    console.log(`App listening to port ${port}`)
});