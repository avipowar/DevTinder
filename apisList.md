# DevTinder APIs

    authRouter:

        - POST /signup
        - POST /login
        - POST /logout

    profileRouter:

        - GET /profile/view
        - PATCH /profile/edit
        - PATCH /profile/password

    connectionRequestRouter
        - POST /request/send/interested/:userId
        - POST /request/send/ignore/:userId

        - POST /request/review/accepted/:userId
        - POST /request/review/rejected/:userId

        - status : ["ignored", "interested", "accepted", "rejected"]

    userRouter
        - GET /user/connections
        - GET /user/request
        - GET /user/feed
