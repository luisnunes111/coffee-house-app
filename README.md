# coffee-house-app

## API

### Docker commands:

**Development command:**
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

**Production commands:**

1. docker-machine env aws01
2. `@FOR /f "tokens=*" %i IN ('docker-machine env aws01') DO @%i`
3. docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

## Web app

### Run localhost:

-   cd packages/web
-   yarn start

### Build:

-   cd packages/web
-   yarn build

-   **ENV variables**:
    -   REACT_APP_API_URL=
