# Next.js OpenJira App

To run localy a database is required

```
docker-compose up -d

```

* -d means _detached_

* Local MongoDb URL

```
mongodb://localhost:27017/entriesdb

```

* install node modules

```
yarn install
yarn dev
```

## SET ENVIRONTMENT VARIABLES
Rename env.template to .env

```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

## FILL DATABASE WITH MOCK DATA

```
http://localhost:3000/api/seed

```