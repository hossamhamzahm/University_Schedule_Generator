#### [Front-End Application Link](http://fwd-forntend-circleci.s3-website-us-east-1.amazonaws.com/)
#### [Backend API](http://schedule-generator-dev.eba-2bpt2qey.us-east-1.elasticbeanstalk.com/)


<br>

> Note: No sensitive data in are hardcoded in the code, instead it is passed through the environment variables in both amazon eb and circle ci [screenshots of both are in docs directory](https://github.com/hossamhamzahm/fwd-last-project/tree/main/docs)

> Note: I have deployed my own application, which has no tests to run, but I got the idea of running tests in the pipeline. I couldn't deploy udagram because it shows a huge amount of errors and there is no time to fix them as I have to finish the program before the 10th of January and I couldn't finish it earlier because of my university exams.


#### Screenshots of the infrastructure needs (RDS, S3, Elastic Beanstalk, etc) are found the [docs directory](https://github.com/hossamhamzahm/fwd-last-project/tree/main/docs) in the Github repository


#### Documentation of the infrastructure needs:
    - Frontend code is hosted on a S3 bucket and served as a static website
    - Backend APIs are hosted on an eb with all needed environment variables and configurations
    - The database instance is Mysql database hosted on Amazon RDS
    - The process goes as the following:
        - Client requests the frontend code form the S3 bucket 
        - After the client receives the frontend code, the frontend code requests the api
        - The API queries the RDS then responds to the frontend


#### A screenshot of the last build is found the [docs directory](https://github.com/hossamhamzahm/fwd-last-project/tree/main/docs) in the Github repository 


#### Documentation of the pipeline found in the [Pipeline process.md](https://github.com/hossamhamzahm/fwd-last-project/tree/main/docs) file in the docs directory


> Click on the status icon to view the pipeline
[![Status Badge](https://circleci.com/gh/hossamhamzahm/fwd-circleci-training.svg?style=svg)](https://app.circleci.com/pipelines/github/hossamhamzahm/fwd-last-project/19/workflows/b108f94f-fdc1-4481-8fba-52e3439ce6ea/jobs/13)


#### Architecture diagram for an overview of the infrastructure and the pipeline
[![architecture diagram](https://raw.githubusercontent.com/hossamhamzahm/fwd-last-project/main/docs/architecture_diagram.png)]() 