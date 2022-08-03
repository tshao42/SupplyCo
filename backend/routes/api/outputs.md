# API SAMPLE JSON RESPONSES

## Products
GET /api/products
[
    {
        "id": 1,
        "name": "Leica M10-R Rangefinder Camera (Black Chrome)",
        "price": "8995",
        "info": "40MP Full-Frame CMOS Sensor \n Leica Maestro II Image Processor \n Optical 0.73x - Magnification Viewfinder \n 3.0\" 1.04m-Dot Touchscreen LCD",
        "createdAt": "2022-08-02T23:32:02.154Z",
        "updatedAt": "2022-08-02T23:32:02.154Z"
    },
    {
        "id": 2,
        "name": "Leica M10 Monochrom Rangefinder Camera",
        "price": "8995",
        "info": "40MP Full-Frame CMOS Sensor \n Leica Maestro II Image Processor \n Optical 0.73x - Magnification Viewfinder \n 3.0\" 1.04m-Dot Touchscreen LCD \n ISO 100-50000, Up to 4.5-fps Shooting \n Long Exposure Times to 16 Min \n Stills- Only Operation \n Built - In Wi - Fi, for Use with FOTOS App \n Weather - Resistant Brass Construction",
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
        "info": "40MP Full-Frame CMOS Sensor \n Leica Maestro II Image Processor \n Optical 0.73x - Magnification Viewfinder \n 3.0\" 1.04m-Dot Touchscreen LCD",
        "createdAt": "2022-08-02T23:32:02.154Z",
        "updatedAt": "2022-08-02T23:32:02.154Z"
    }
]
## Orders
GET /api/orders/1
    [
        {
            "id": 1,
            "buyerId": 1,
            "addressPlaceId": "ChIJPwi-Dpne3IARhY3NJXuK8g0",
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
        "buyerId": 1,
        "addressPlaceId": "ChIJPwi-Dpne3IARhY3NJXuK8g0",
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
    "buyerId": 2,
    "addressPlaceId": "ChIJPwi-Dpne3IARhY3NJXuK8g0",
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
    "addressPlaceId": "ChIJPwi-Dpne3IARhY3NJXuK8g1",
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