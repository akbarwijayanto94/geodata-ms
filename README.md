## Getting Started

## Setup

### 1. Installation

After cloning the project, make sure you have node v18^ and yarn installed.
Then you can run this command

```jsx
# Install without updating lockfile
yarn install --frozen-lockfile
```

### 3. Development

- Make sure you have `.env.development.local` file. list of ENV variables needed:

```yml
APP_PORT=4000

DB_DATABASE=gdms
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=123456
DB_SYNC=false # sets DB_SYNC to FALSE, Do not set it to TRUE on PRODUCTION mode
DB_LOGGING=error

```

## Setting Up DB

1. Make sure you have a postgres DB up and running
2. Set the DB env variables in `.env`

## Format Conventions

Please configure your IDE to format your code based on the included `.prettierrc.json` `prettier` config file.
