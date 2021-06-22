# **Myusedcarsalesman-api-auth**
 
Website Link: [https://myusedcarsalesman.now.sh](https://myusedcarsalesman.now.sh)
 
## Core Features
This an express server used in the "Myusedcarsalesman" App. 
The endpoints this API provides include the following. 
 
**/api/auth**
- [POST] /login - login endpoint for users 
- [POST] /login - login endpoint for administers
- [GET] /check-jwt - for checking if jwt token has expired
 
**/api/images**
- [GET] / - get all post images
- [POST] / - add a new image
- [GET] /:post_id - get an image with corresponding post ID
- [PATCH] /:post_id - change an image with corresponding post ID
 
**/api/posts**
- [GET] / - get all posts
- [POST] / - create a new post
- [GET] /:post_id - get a post with correspoding post ID
- [GET] /by-users - get all posts made by the requested user
- [DELETE] /:post_id - delete a post requested by a user
- [PATCH] /:post_id - update a post
- [DELETE] /admin/:post_id - delete a post requested by admin
 
**/api/reports**
- [GET] / - get all user reports
 
**/api/users**
- [GET] / - get all user information
- [POST] / - add a new user
- [GET] /:user_id - get a user information with corresponding ID
- [DELETE] /:user_id - delete a user with corresponding ID
- [PATCH] /:user_id - change the status of a user with corresponding ID (Block or Active)
- [GET] /user-emails/:user-name - get user email with corresponding username
 
## Technologies used
- Node.js (Express)
- JWT Token Authentication
- PostgreSQL
- Heroku Server and Database (Deployment)
- Testing with Mocha, Chai, and Supertest
 
## Running the server with client locally
Clone [MyusedCarSalesman-client](https://github.com/ddlanf/MyUsedCarSalesman-client) repository.
Once you clone both client and server, do the following.
1. In "myusedcarsalesman-client", change the API_ENDPOINT in config.js to localhost:8000 or any other ports that may be used.
2. Configure the CORS setting in "myusedcarsalesman-api-auth" to allow localhost to send requests. This is can be done simply by adding app.use(cors()) in App.js file or changing the value of CLIENT_ORIGIN in config.js  
3. Run both client and server with "npm start". "npm run dev" can also be used in "myusedcarsalesman-api-auth"
 
 

<!-- Just adding a random comment -->