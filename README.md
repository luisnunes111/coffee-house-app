# coffee-house-app

## API:

[DEMO](http://100.24.46.157:4000/): Deployed in AWS EC2

## Docker commands:

**Development command:**
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

**Production commands:**
docker-machine env aws01
@FOR /f "tokens=\*" %i IN ('docker-machine env aws01') DO @%i
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
