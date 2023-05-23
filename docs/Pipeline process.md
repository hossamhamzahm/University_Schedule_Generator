## Pipeline Process Documentation:

#### Documentation of the pipeline:
    - Circleci is triggered once a new commit is pushed to Github and starts the pipeline process
    - Spin up the environment and setup environment variables
    - Install node, NPM, AWS CLI, EB CLI
    - Configure AWS credentials
    - Install UI Dependencies
    - Install Server Dependencies
    - Run Builds
    - Deploy frontend & backend:
        - Deploy frontend to S3 bucket
        - Deploy backend to eb
    - Set All backend environment variables
