- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What is the use of "-g" while npm install
- Difference b/w caret and tilde ( ^ vs ~ )


- Initialize git
- make .gitignore file
- Create a remote repo on github
- Push all code to remote origin
- Play with routes and route extensions ex: /hello, /hello/2
- Order of the routes matters
- Install Postman app and make a workspace/collections > test API call
- Explore routing and use of ?, *, (), + in the routes
- Use of regex in routes /a/, /.*fly$/
- Reading the dynamic routes


- Multipe Route Handlers - Play with the code
- next()
- next functions and errors along with res.send()
- app.use('/user', rH, [rH2, rH3], rH4, rH5);
- What is middleware? Why do we need it?
- How expressJS basically handles requests behind the scenes?
- Diff b/w app.use and app.all?
- Write a dummy auth middleware for admin?
- Write a dummy auth middleware for all User routes, except /user/login?
- Error Handling using a app.use("/", (err, req, res, next) = {})


- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect database before starting application on 3000 port
- Create a userSchema & user Model.
- create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error handling using try, catch


- Difference b/w JSON and Javascript
- Add the express.json middleware to your app
- Make your signUp API dynamic to receive data from the end user
- User.findOne with duplicate email ids, which object returned?
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API - Get user by ID
- Create a delete user API
- Difference b/w PATCH and PUT
- API - Update a user
- Explore the Mongoose documentation for model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with emailId



