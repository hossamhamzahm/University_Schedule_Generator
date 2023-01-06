aws s3 cp --recursive . s3://fwd-forntend-circleci/
aws s3 cp  --cache-control="max-age=0, no-cache, no-store, must-revalidate" ./index.html s3://fwd-forntend-circleci/