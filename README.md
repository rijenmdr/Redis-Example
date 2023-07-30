# Readme for Photo API with Redis Caching

This repository contains a simple Node.js application that provides a photo API with Redis caching. The API fetches photo data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API and caches the results in a Redis database to improve performance and reduce unnecessary external requests.

# Requirements

To run this application, you need to have the following installed on your system:

1. Node.js (version 14 or higher)
2. npm (Node Package Manager)
3. Redis server

## Installation

1. Clone this repository to your local machine

   `git clone <repository_url.git>`
2. Change into the project directory:

   `cd <project_directory> `
3. Install the dependencies using npm:

   `npm install`


## Configuration

Before running the application, make sure to configure the Redis connection. The Redis client is set up in the `index.js` file. By default, it connects to the Redis server on the default host (`localhost`) and port (`6379`). If your Redis server is running on a different host or port, update the configuration accordingly:

```
// index.js

const Redis = require('redis');
let redisClient;

(async () => {
    // Update the Redis server configuration here
    const redisConfig = {
        host: 'localhost', // Update with your Redis server host
        port: 6379,        // Update with your Redis server port
    };

    redisClient = Redis.createClient(redisConfig);

    // ... rest of the code ...
})();
```


## Usage

To start the application, run the following command:

`npm start`

The application will start running on port 3000 by default. You can access the API using the following endpoints:

### Fetch photos by album ID

`GET /api/photos?albumId={albumId}`


This endpoint fetches a list of photos for a specific album ID from the JSONPlaceholder API. The response is cached in Redis, and subsequent requests for the same album ID will be served from the cache if available.

### Fetch a single photo by ID

`GET /api/photos/:id`


This endpoint retrieves a single photo by its unique ID from the JSONPlaceholder API. The response is cached in Redis, and subsequent requests for the same photo ID will be served from the cache if available.

## Caching Strategy

The application uses Redis caching to store the API responses for a default expiration period (3600 seconds or 1 hour). When a request is made for photo data, the application first checks if the data is available in the Redis cache. If the data exists, it is returned directly from the cache, avoiding an external API call. If the data is not found in the cache, the application fetches it from the JSONPlaceholder API, stores it in the Redis cache, and returns the response to the client.

## Error Handling

If any error occurs during the API request or caching process, the application will respond with a JSON object containing an error message and a status code of 400.

## Contributing

Contributions to this repository are welcome. If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://chat.openai.com/LICENSE) file for details.

---

Thank you for using the Photo API with Redis Caching! If you have any questions or need further assistance, please don't hesitate to contact us. Happy coding!
