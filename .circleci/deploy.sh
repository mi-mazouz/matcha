#!/bin/bash

apt-get update && apt-get install -y python-dev

curl --silent --show-error --retry 5 https://bootstrap.pypa.io/get-pip.py | python
pip install awscli

rm **/*.secret
cd app

yarn deploy
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id ${CLOUD_FRONT_DISTRIBUTION_ID} --paths "/*"