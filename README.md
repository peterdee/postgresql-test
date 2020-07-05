## PostgreSQL performance testing with Node & Sequelize

Testing some PostgreSQL capabilities:
- comparing raw SQL query speeds with Sequelize
- estimating query speeds for the big databases (millions of table records)

### Deploy

```shell script
git clone https://github.com/peterdee/postgresql-test
cd ./postgresql-test
nvm use 14
npm i
```

### Environment

The `.env` file is required, see the [.env.example](.env.example) file for more information about the required environemnt variables

### Run

```shell script
npm start
```

### Results

Testing locally on a MacBook Pro 15-inch (2018) with 16GB RAM

```text
database ready

count users: 74 ms, 2082174 users
count users [RAW]: 69 ms, 2082174 users

load single record without any condition: 3 ms
load single record without any condition [RAW]: 1 ms

load multiple records without any condition: 186 ms
load multiple records without any condition [RAW]: 182 ms

load single record with conditions: 4 ms
load single record with conditions [RAW]: 0 ms

load multiple records with conditions: 230 ms, found 500 results
load multiple records with conditions [RAW]: 231 ms, found 500 results

load single record with JOIN without any condition [RAW]: 717 ms

load single record with JOIN with conditions [RAW]: 437 ms

load multiple records with JOIN without any condition [RAW]: 1726 ms

load multiple records with JOIN with conditions [RAW]: 440 ms
```
