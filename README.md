# coffee-house-app

[DEMO](https://reverent-poitras-43bd2c.netlify.com/): Deployed in netlify

API: http://100.24.46.157:4000/ (Deployed in AWS EC2)

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
    -   REACT_APP_API_URL=http://100.24.46.157:4000
