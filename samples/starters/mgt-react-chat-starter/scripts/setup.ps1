# login
Write-Output "Sign in to Microsoft 365..."
npx -p @pnp/cli-microsoft365 -- m365 login --authType browser

# create AAD app
Write-Output "Creating AAD app..."
$appId = npx -p @pnp/cli-microsoft365 -- "m365 aad app add --name mgt-react-starter --multitenant --redirectUris http://localhost:3000 --platform spa --query appId -o text"

Write-Output "AppId: $appId"

# write app to env.js
Write-Output "Writing app to .env..."
"REACT_APP_CLIENT_ID='$appId'" | Out-File .\.env

Write-Output "DONE"