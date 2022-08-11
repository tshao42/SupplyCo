# API SAMPLE JSON RESPONSES

## Products
GET /api/products
[
    {
        "id": 1,
        "name": "Leica M10-R Rangefinder Camera (Black Chrome)",
        "price": "8995",
        "info": "40MP Full-Frame CMOS Sensor \nLeica Maestro II Image Processor \nOptical 0.73x - Magnification Viewfinder \n3.0\" 1.04m-Dot Touchscreen LCD",
        "createdAt": "2022-08-02T23:32:02.154Z",
        "updatedAt": "2022-08-02T23:32:02.154Z"
    },
    {
        "id": 2,
        "name": "Leica M10 Monochrom Rangefinder Camera",
        "price": "8995",
        "info": "40MP Full-Frame CMOS Sensor \nLeica Maestro II Image Processor \nOptical 0.73x - Magnification Viewfinder \n3.0\" 1.04m-Dot Touchscreen LCD \nISO 100-50000, Up to 4.5-fps Shooting \nLong Exposure Times to 16 Min \nStills- Only Operation \nBuilt - In Wi - Fi, for Use with FOTOS App \nWeather - Resistant Brass Construction",
        "createdAt": "2022-08-02T23:32:02.154Z",
        "updatedAt": "2022-08-02T23:32:02.154Z"
    }
]

GET /api/products/1
[
    {
        "id": 1,
        "name": "Leica M10-R Rangefinder Camera (Black Chrome)",
        "price": "8995",
        "info": "40MP Full-Frame CMOS Sensor \nLeica Maestro II Image Processor \nOptical 0.73x - Magnification Viewfinder \n3.0\" 1.04m-Dot Touchscreen LCD",
        "createdAt": "2022-08-02T23:32:02.154Z",
        "updatedAt": "2022-08-02T23:32:02.154Z"
    }
]
## Orders
GET /api/orders/1
    [
        {
            "id": 1,
            "userId": 1,
            "address": "1214 Synergy, Irvine, CA 92614",
            "orderFor": "Demo User",
            "total": "8995",
            "createdAt": "2022-08-02T23:56:45.265Z",
            "updatedAt": "2022-08-02T23:56:45.265Z",
            "Orderitems": [
                {
                    "id": 1,
                    "orderId": 1,
                    "productId": 1,
                    "quantity": 2,
                    "createdAt": "2022-08-02T23:56:45.278Z",
                    "updatedAt": "2022-08-02T23:56:45.278Z"
                },
                {
                    "id": 2,
                    "orderId": 1,
                    "productId": 2,
                    "quantity": 1,
                    "createdAt": "2022-08-02T23:56:45.278Z",
                    "updatedAt": "2022-08-02T23:56:45.278Z"
                }
            ]
        }
    ]

GET /api/orders/users/1
[
    {
        "id": 1,
        "userId": 1,
        "address": "1214 Synergy, Irvine, CA 92614",
        "orderFor": "Demo User",
        "total": "8995",
        "createdAt": "2022-08-02T23:56:45.265Z",
        "updatedAt": "2022-08-02T23:56:45.265Z",
        "Orderitems": [
            {
                "id": 1,
                "orderId": 1,
                "productId": 1,
                "quantity": 2,
                "createdAt": "2022-08-02T23:56:45.278Z",
                "updatedAt": "2022-08-02T23:56:45.278Z"
            },
            {
                "id": 2,
                "orderId": 1,
                "productId": 2,
                "quantity": 1,
                "createdAt": "2022-08-02T23:56:45.278Z",
                "updatedAt": "2022-08-02T23:56:45.278Z"
            }
        ]
    }
]

POST /api/orders

(sample request)
{
    "userId": 2,
    "address": "1214 Synergy, Irvine, CA 92614",
    "orderFor": "Demo User",
    "total": "8995",
    "Orderitems": [
        {
            "productId": 1,
            "quantity": 2
        },
        {
            "productId": 2,
            "quantity": 1
        }
    ]
}

Response json for now is the new order Id created
TODO: figure out what needs to be returned

PUT /api/orders/:orderId
{
    "address": "1100 Synergy, Irvine, CA 92614",
    "orderFor": "TSS",
    "total": "12000",
    "Orderitems": [
        {
            "id": 3,
            "quantity": 3
        },
        {
            "id": 4,
            "quantity": 4
        }
    ]
}


## Review
GET (any one's format) JSON
[
    {
        "id": 1,
        "productId": 1,
        "userId": 1,
        "title": "Best Camera Ever",
        "content": "I cannot express how much I am satisfied with this viewfinder",
        "rating": 5,
        "createdAt": "2022-08-03T06:56:08.868Z",
        "updatedAt": "2022-08-03T06:56:08.868Z"
    }
]

POST REVIEW
{
        "productId": 1,
        "userId": 2,
        "title": "Trying to post",
        "content": "Not sure why I bought this, but I like it",
        "rating": 5
}

UPDATE REVIEW
{
        "title": "Trying to post!!!",
        "content": "Not sure why I bought this, but I like it",
        "rating": 5
}