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
