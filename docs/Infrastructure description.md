### Infrastructure Description:
    - Frontend code is hosted on a S3 bucket and served as a static website
    - Backend APIs are hosted on an eb with all needed environment variables and configurations
    - The database instance is Mysql database hosted on Amazon RDS
    - The process goes as the following:
        - Client requests the frontend code form the S3 bucket 
        - After the client receives the frontend code, the frontend code requests the api
        - The API queries the RDS then responds to the frontend