#!/bin/bash

mkdir -p coverage
npm run tap
code=$?
cat .tap | ./node_modules/.bin/tap-mocha-reporter xunit > coverage/test.xml
exit $code
