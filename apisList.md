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

        - Combine above two APIs : POST /request/send/:status/:userId

        - POST /request/review/accepted/:userId
        - POST /request/review/rejected/:userId

        - Combine above two APIs : POST /request/review/:status/:userId

        - status : ["ignored", "interested", "accepted", "rejected"]

    userRouter
        - GET /user/request/receives
        - GET /user/connections
        - GET /user/feed
