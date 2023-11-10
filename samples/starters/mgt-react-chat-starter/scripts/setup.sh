#!/usr/bin/env bash

# login
echo "Sign in to Microsoft 365..."
npx -p @pnp/cli-microsoft365 -- m365 login --authType browser

# create AAD app
echo "Creating AAD app..."
appId=$(npx -p @pnp/cli-microsoft365 -- m365 aad app add --name mgt-react-starter --multitenant --redirectUris http://localhost:3000 --platform spa --query appId -o text)

# write app to env.js
echo "Writing app to .env..."
echo "REACT_APP_CLIENT_ID='$appId'" > ./.env

echo "DONE"