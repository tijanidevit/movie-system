<!-- # MTS API  -->

# MTS-API

# Documentation

## Main Link https://multims.herokuapp.com/

# Tourists' Endpoints

## Registration

- https://multims.herokuapp.com/tourists/register :POST

  Requires {firstname, password, othernames, phone, profile_image, state_id, email, gender_id, date_of_birth}

  Returns

    {
        "success": true,
        "message": "Tourist Creation Successful",
        "data": {
            "id": 2,
            "firstname": "adejare",
            "phone": "dded efaeuae efuefefeife uiaaif",
            "state_id": 1,
            "gender_id": 1,
            "profile_image": "uploads/users/1619643692329Davido.jpg",
            "email": "avatar22@me.com",
            "date_of_birth": "2020-08-09T00:00:00.000Z",
            "updatedAt": "2021-04-28T21:01:34.007Z",
            "createdAt": "2021-04-28T21:01:34.007Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2YXRhcjIyQG1lLmNvbSIsImlkIjoyLCJpYXQiOjE2MTk2NDM2OTQsImV4cCI6MTYzMDAxMTY5NH0.k3iR1B23M6g6eT-FauQ3WQ_fM_hyfkeELKGX4SFjvfs"
    }

## Login

- https://multims.herokuapp.com/tourists/login :POST

  Requires {email, password}

  Returns

    {
        "success": true,
        "message": "Authentication successful!",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF2YXRhckBtZS5jb20iLCJpZCI6MSwiaWF0IjoxNjE5NjQ0NjU1LCJleHAiOjE2MzAwMTI2NTV9.hlVE2BAT1ghRfSiibBsw63cfLbikFXvWghjyoNWaQAA"
    }

## View Profile

- https://multims.herokuapp.com/tourists/profile :GET

  Requires {'bearer token'}

  Returns

    {
        "success": true,
        "message": "Account Fetch Successful",
        "data": {
            "id": 1,
            "firstname": "adejare",
            "state_id": 1,
            "gender_id": 1,
            "email": "avatar@me.com",
            "phone": "dded efaeuae efuefefeife uiaaif",
            "profile_image": "uploads/users/1619643539940Davido.jpg",
            "date_of_birth": "2020-08-09T00:00:00.000Z",
            "createdAt": "2021-04-28T20:59:01.273Z",
            "updatedAt": "2021-04-28T20:59:01.273Z",
            "state": {
                "id": 1,
                "state": "Osun",
                "createdAt": "2021-04-28T21:20:52.462Z",
                "updatedAt": "2021-04-28T21:20:52.462Z"
            },
            "gender": {
                "id": 1,
                "gender": "Male",
                "createdAt": "2021-04-28T21:20:36.097Z",
                "updatedAt": "2021-04-28T21:20:36.097Z"
            }
        }
    }

## Update Account

- https://multims.herokuapp.com/tourists/update :PATCH

  Requires {firstname, othernames, phone, state_id, email, gender_id, date_of_birth}

  Returns

    {
        "success": true,
        "message": "Tourist updated successfully",
        "data": {
            "id": 1,
            "firstname": "adejare",
            "state_id": "1",
            "gender_id": "1",
            "email": "avatar@me.com",
            "phone": "dded efaeuae efuefefeife uiaaif",
            "profile_image": "uploads/users/1619643539940Davido.jpg",
            "date_of_birth": "2020-08-09T00:00:00.000Z",
            "createdAt": "2021-04-28T20:59:01.273Z",
            "updatedAt": "2021-04-28T21:39:04.837Z"
        }
    }

## View Landmark Visits

- https://multims.herokuapp.com/tourists/visits :GET

  Requires {'bearer token'}

  Returns

    {
        "success": true,
        "message": "Account Fetch Successful",
        "data": {
            "id": 1,
            "firstname": "adejare",
            "state_id": 1,
            "gender_id": 1,
            "email": "avatar@me.com",
            "phone": "dded efaeuae efuefefeife uiaaif",
            "profile_image": "uploads/users/1619643539940Davido.jpg",
            "date_of_birth": "2020-08-09T00:00:00.000Z",
            "createdAt": "2021-04-28T20:59:01.273Z",
            "updatedAt": "2021-04-28T20:59:01.273Z",
            "state": {
                "id": 1,
                "state": "Osun",
                "createdAt": "2021-04-28T21:20:52.462Z",
                "updatedAt": "2021-04-28T21:20:52.462Z"
            },
            "gender": {
                "id": 1,
                "gender": "Male",
                "createdAt": "2021-04-28T21:20:36.097Z",
                "updatedAt": "2021-04-28T21:20:36.097Z"
            }
        }
    }



# Landmarks' Endpoints

## View all Landmarks

- https://multims.herokuapp.com/landmarks :GET

  Requires {}

  Returns

    {
        "success": true,
        "message": "Landmarks Fetch Successful",
        "data": [
            {
                "id": 1,
                "title": "BBN FOODS",
                "category_id": 1,
                "description": "We sell all kinds of food. African or American, he dey!",
                "image": "uploads/1619651021946c03329352.jpg",
                "latitude": "-42",
                "longitude": "35",
                "visits": 0,
                "createdAt": "2021-04-28T23:03:42.537Z",
                "updatedAt": "2021-04-28T23:03:42.537Z"
            }
        ]
    }

## View a Landmarks

- https://multims.herokuapp.com/landmarks/{id} :GET

  Requires {id}

  Returns

    {
        "success": true,
        "message": "Landmark Fetch Successful",
        "data": {
            "id": 1,
            "title": "BBN FOODS",
            "category_id": 1,
            "description": "We sell all kinds of food. African or American, he dey!",
            "image": "uploads/1619651021946c03329352.jpg",
            "latitude": "-42",
            "longitude": "35",
            "visits": 0,
            "createdAt": "2021-04-28T23:03:42.537Z",
            "updatedAt": "2021-04-28T23:03:42.537Z",
            "category": {
                "id": 1,
                "category": "Food and Drinks",
                "createdAt": "2021-04-28T22:12:02.272Z",
                "updatedAt": "2021-04-28T22:12:02.272Z"
            }
        }
    }

## Visit a Landmark

- https://multims.herokuapp.com/landmarks/{id}/visits :POST

  Requires {id}

  Returns

    {
        "success": true,
        "message": "Visitation Added Successfully",
        "data": {
            "id": 2,
            "tourist_id": 1,
            "landmark_id": 1,
            "updatedAt": "2021-04-28T23:14:59.276Z",
            "createdAt": "2021-04-28T23:14:59.276Z"
        }
    }

## Visit a Landmarks' Visits

- https://multims.herokuapp.com/landmarks/{id}/visits :GET

  Requires {id}

  Returns

    {
        "success": true,
        "message": "Landmark Visits Fetch Successful",
        "data": [
            {
                "id": 1,
                "tourist_id": 1,
                "landmark_id": 1,
                "createdAt": "2021-04-28T23:11:38.722Z",
                "updatedAt": "2021-04-28T23:11:38.722Z",
                "tourist": {
                    "id": 1,
                    "firstname": "adejare",
                    "state_id": 1,
                    "gender_id": 1,
                    "email": "avatar@me.com",
                    "phone": "dded efaeuae efuefefeife uiaaif",
                    "profile_image": "uploads/users/1619643539940Davido.jpg",
                    "date_of_birth": "2020-08-09T00:00:00.000Z",
                    "password": "$2a$10$raHpFziSoiAdc4j./NhtNOVAjDYrgMpToyOpLZ2VYeeLmdygk0CJm",
                    "createdAt": "2021-04-28T20:59:01.273Z",
                    "updatedAt": "2021-04-28T21:39:04.837Z"
                }
            },
            {
                "id": 2,
                "tourist_id": 1,
                "landmark_id": 1,
                "createdAt": "2021-04-28T23:14:59.276Z",
                "updatedAt": "2021-04-28T23:14:59.276Z",
                "tourist": {
                    "id": 1,
                    "firstname": "adejare",
                    "state_id": 1,
                    "gender_id": 1,
                    "email": "avatar@me.com",
                    "phone": "dded efaeuae efuefefeife uiaaif",
                    "profile_image": "uploads/users/1619643539940Davido.jpg",
                    "date_of_birth": "2020-08-09T00:00:00.000Z",
                    "password": "$2a$10$raHpFziSoiAdc4j./NhtNOVAjDYrgMpToyOpLZ2VYeeLmdygk0CJm",
                    "createdAt": "2021-04-28T20:59:01.273Z",
                    "updatedAt": "2021-04-28T21:39:04.837Z"
                }
            }
        ]
    }