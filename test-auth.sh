#!/bin/bash

echo "Testing authentication with valid credentials..."

curl -X POST http://localhost:3000/api/graphql/system \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "query": "mutation { auth_login(email: \"tom.nanjing@gmail.com\", password: \"sual116y\") { access_token refresh_token } }"
  }' \
  --verbose \
  --max-time 30

echo -e "\n\nDone."
