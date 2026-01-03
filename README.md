# How To Start Project

    - Create a folder
    - Initialize the project
    - Install Express FrameWork
    - Create a server
    - Run this server on some port
    - once runes the server then send response

# Routing And Request

    - play with different routes
    - Order Of The Route Matter A Lot

    - Package.json is a Human Ridable File
    - PackageLock.json is Machine Ridable File

    - Whenever Yor Write Something On URL. It Made GET Api Call

    - Go to PotsMan.com and Download It
    - What is Job Of Postman Is Its Basically Test Your APIS

    - Learn How to Handle. One Route In Multiple Route Handlers
    - Learn Next() - Play With Code

    - What is Middleware
    - And How Express js handle the request behind the seen

    - Why is MiddleWARE
    - How to write authentication for the Different Routes

    - Learn how to handle error handlers

# Database Schema and models || mongoose

    - Create a cluster inside a (mongodb atlas)
    - Get Connection string
    - install mongodb compass
    - connect your mongodb atlas (cluster) to your mongodb compass
    - install Mongoose To connect your application to database
    - Now connect your Database to your application

    - Directly connect mongodb to your application is a not a good way because he return the promise
    - So instead we made connection directly we put it inside a async await function

    - Connection made successfully but first my server is listen then db is connected this also a not a good way
    - so first db is connect then server listen th request

    - create a userSchema and User model

    - We create a POST API -> /signUp for adding data into database
    - Then add a data into a database using POSTMAN api call
    - Error handling using try catch

# EP:7 Diving Into The API

    - Pass Dynamic data
    - Use Middleware (express.json) into your app to convert json => js object.
    - Make your /signup API Dynamic to receive data from end user
    - Diff between Js Object vs Json Object

    - Make API /user => get the user based on email
    - Make API /feed => get the all the user

    - Make API /user => delete the user
    - make API /user => Update the user
    - Make APU /USER => Update the user form email id

# EP:8 Data Sanitization And Schema Validation

    - Explore SchemaType Options from The Documentation
    - Add Required, minLength, maxLength, trim, unique, lowerCase
    - Add Default
    - Create Custom Validation Function for gender
    - Add timestamps to the userSchema
    - Improve the db schema

    - Add API level Validation On Patch Request and sigNup Post API
    - Data Sanitizing - Add api validation for each filed

    - Do not update the emailId, name, userId
    - We cannot add skills more tha  10

    - Explore Validator library function and use validator functions for PASSWORD, EMAIL, PHOTO_URL

# EP:9 Encrypting Password and EP:10 Authentication JWT and Cookies

    - Before Create a new instance of User Validate your data => signUp API => Use Helper Function to do that
    - Install bcrypt package
    - Encrypt your password => Create a user with bcrypt.hash() and save the user in database with encrypted password

    - make login API and Login the user
        - Also create a cookie inside the login API
        - And inside that cookie we place JWT token
        - and send back to the user/ client / browser
        - browser job is store this cookie

    - now making get/profile API call
        - and read these cookie when the user make another call
        - reading the cookie we install package is cookie.parser
        - and verify the user using decoded message (jwt.verify() method)
        - age get the user back

    - create token
        - for that use package is json web token
        - create token with (jwt.sign(data, password/privatekey))
        - send the token inside cookie

    - Add AUTH Middleware
    - expire cookie and token will be set
    - write helper function for token in userModel
    - write helper function for password

# EP: 11 Diving into the APIs and Express Router

    - Think APIs for your devTinder Application

    - EXPRESS ROUTER
        - create a route for APIs using express router
        - And make route inside in separate folder

    - Create a logOut api
    - Create a editProfile api
    - create forgot password route
        - use crypto to hash that value
        - use comparison operator which is $gt
        - create validation function
        - create hash password using bcrypt

# EP: 12 Logical Database Query and Compound Indexes

    - Created new schema for connection request / created new model
    - create connection api /request/send/:status/:userId and write some logic to save data in db
    - user parm to get dynamically data from URL path

    - add validation for my send request api is allowed STATUS type is ignored / interested

    - add validation for connection req
        case 1: USER1 => (send connection req) =>  USER2 => Is allowed
        case 2: USER1 => (again send connection req 2nd time) =>  USER2 => Is not allowed
        case 3: USER1 <= ( send connection request) <=  USER2 => Is not allowed

        case 4: USER1 => (tries to req ) => RANDOM USER (this user is not present on my DB) => THROW AN ERROR (USER NOT EXIST)

        case 5: USER1 => (tries to req ) => USER1 => THROW AN ERROR (user is cannot send connection request tp yourself)

        <!-- same case handled by schema level validation using pre("save" function (){}) -->
        case 5: USER1 => (tries to req ) => USER1 => THROW AN ERROR (user is cannot send connection request tp yourself)

    - Learn MongoDB Indexes
        - normal indexes
        - unique indexes
        - compound indexes

# EP: 13 ref, Populate and Thought Process Of Writing APIs

    - Create Accept/Reject APIs:  POST /request/review/:status/:userId

        - Check Validation for above APIs

            - check my status is accepted or rejected => is anything else apart form that throw an error

            - first i will check if accepting or rejecting req user is LOGIN or not
            - is coming req is in my database or not
            - or my status is interested or not

    - Create get APIs( show all the receive/pending req getting from user ) :  - GET /user/request/receives

        - ref : tells the mongoose => this object id => which collection belongs to
        - populate : fetches the reference document => and replace with the objectId

    - Create get APIs( show all the accepted ) :  - GET /user/connections
        - map function
        - $or [{},{}]

# EP: 14 Building Full APIs and Pagination

    - Create FEED APIs : GET /feed

        - Show the users on ui => So my loggedInUser is make => left swap(ignored APIs call ) or right swap(interestedAPIs call )

        - first i will check in my Database(connectionRequests Collection) => send req data and receive req data
        - i will collect => all the send request and receives request

        -  SELECT => IS used to choose form current document

        - Set() DataStructure => find unique element => form collect send req or receive req
        - Add all the document in set
        - set store unique document

        - use FOREACH loop =>  to travel each document apart form set document  => in User Collection => send res all the document which i get

        - $and => if two condition => true => give me the document
        - $nin => Value is not in list =>
        - $in => value in list
        - $ne => not equal

    - Create Pagination in my website

        - Pagination:  mens divided large data into smaller pages

        - Query Parameter : key value pair => passed in URL => control api behavior

        - skip().limit() => we add key value pair here

        - pagination alway start from page => 1

# handle some issues

    - add cors package
    - user login successfully =>  send user info  back
