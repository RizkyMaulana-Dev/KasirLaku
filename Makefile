.PHONY: install dev build test seed reset clean

install:
	yarn install

dev:
	yarn dev

build:
	yarn build

test:
	yarn test

seed:
	yarn db:seed

reset:
	yarn db:reset

clean:
	rm -rf dist node_modules/.cache
