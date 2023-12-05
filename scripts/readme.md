# Instruction
## How to run the script

### 1. Install dependencies
```pip install -r requirements.txt```
### 2. set environment variables
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD

### 3. add api key
- place api key in scripts/path_api_key

### 2. Run the script
```python import_new.py```

### 3. pg_dump data from tables:
- games
- categories
- games_categories

## How to prepare data for import to java app
### 1. place results of pg_dump into backend/src/main/resources files:
- games dump into games.sql
- categories dump into categories.sql
- games_categories dump into games_categories.sql
### 2. from these files remove everything that is not insert statement

so that spring can understand it

### 3. for games.sql use find and replace to change "NULL);" -> "1) ON CONFLICT DO NOTHING;"

to change null value of gameStatus to one and avoid duplicate entries

### 4. for games_categories.sql and categories.sql use ");" -> ") ON CONFLICT DO NOTHING;"

to avoid duplicate entries

## it should work





