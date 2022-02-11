network:
	docker network create event_app-app

postgres:
	docker run --name postgres12 --network event_app-app -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:12-alpine

docker:
	docker start postgres12

createdb:
	docker exec -it postgres12 createdb --username=root --owner=root event_app

dropdb:
	docker exec -it postgres12 dropdb event_app

watch:
	yarn start:dev