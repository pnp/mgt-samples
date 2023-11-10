# Getting Started with mgt-react-starter

This starter project is a simple React app that uses the [Microsoft Graph Toolkit](https://aka.ms/mgt) to sign in a user and display their profile picture and name. From this experience, you will be able to extend the app to use other components from the toolkit and access more data from Microsoft Graph.

You can download this specific starter project by clicking on the "Download" button below.

[![Download mgt-react-chat](https://img.shields.io/badge/Download-MGT%20React%20Starter-green.svg)](https://pnp.github.io/download-partial/?url=https://github.com/pnp/mgt-samples/tree/main/samples/starters/mgt-react-chat-starter)

## Table of Contents

- [Pre-requisites](#prereqs)
- [Configure Azure AD App Registration](#appreg)
  - [PowerShell 7](#pwsh)
  - [Bash](#bash)
  - [Manual](#manual)
- [Launch Application](#launch)

## Pre-requisites <a id="prereqs"></a>

1. [Setup your Microsoft 365 tenant](https://learn.microsoft.com/graph/toolkit/get-started/overview#set-up-your-microsoft-365-tenant)
1. [Set up your development environment](https://learn.microsoft.com/graph/toolkit/get-started/overview##set-up-your-development-environment)

## Configure Entra App Registration <a id="appreg"></a>

There are two ways which you can configure the App Registration required for the samples to work correctly, through automatation using either a `bash` or `PowerShell` script we provide for you in the `scripts` directory, or manually through Azure Portal.

> Note that the script will create a file called `.env`, in the root of this directory. This file contains the client ID of the application registration that is created.

### PowerShell 7 <a id="pwsh"></a>

> The script uses CLI for Microsoft 365 to authenticate with and create the app registration in your tenant, therefore requires nodejs, v8 or greater to be installed

```sh
> ./scripts/setup.ps1
```

Follow the prompts in the terminal.

### bash <a id="bash"></a>

> The script uses CLI for Microsoft 365 to authenticate with and create the app registration in your tenant, therefore requires nodejs, v8 or greater to be installed

```sh
> chmod +x scripts/setup.sh
> ./scripts/setup.sh
```

Follow the prompts in the terminal.

### Manual <a id="manual"></a>

The following table provides details of how to configure your app registration.

| Property | Value |
| ---- | ---- |
| Name | graph-developer-proxy-samples |
| Account types | Accounts in any organizational directory (Any Azure AD directory - Multitenant) |
| Platform type | Single-page application |
| Redirect URIs | <http://localhost:3000> |

After creating the app registation, create a file called `.env` in the root of this directory with the following contents, replacing `<clientid>` with the value which can be copied from the portal.

```
REACT_APP_CLIENT_ID='<clientid>';
```

## Launch project <a id="launch"></a>

```sh
> npm install
> npm start
```
