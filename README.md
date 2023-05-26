# Sample Food Delivery Backend REST API

> uses Typescript, Nest.js and postgresql with famous library Objectionjs and Knex.

## Installation

Install dependencies and devDependencies:

```bash
$ yarn install
```

## Configuration

Configuration environment and change basic credentials:

```bash
$ cp .env.example .env
```

## Create Database

```bash
$ pgcli --user postgres
-> password:- ****
$ CREATE DATABASE food_delivery
```

## Start Server

Start the nest server:

```bash
$ yarn start
```

Start the nest development server:

```bash
$ yarn start:dev
```

## Useful npm/yarn commands

- `yarn build` - Transpile TypeScript code
- `yarn start` - Run application
- `yarn start:dev` - Run application in development mode
- `yarn run format` - Formate code with pritter
- `yarn run lint` - Run for typescript linting
- `yarn run migrate:make` - Run for create migration with name of migration
- `yarn run migrate:latest` - Run for migrate and create schema
- `yarn run migrate:rollback` - Run for rollback batch migration

## Docs & Community

- [#Nest](https://nestjs.com/) for node js framework
- [#postgres](https://www.postgresql.org/) for database
- [#Objectionjs](https://vincit.github.io/objection.js/)
- [#Knexjs](http://knexjs.org/)
- [#RabbitMQ](https://rabbitmq.com/) for Messages and Queues
- [#Yarn](https://yarnpkg.com/lang/en/) for Official package manager
- [#CodeEditor](https://code.visualstudio.com/) Official text editor
- [#StackOverflow](https://stackoverflow.com) thanks for helping and provide solution on every problem

## File Structure (Shallow)

├── src
| ├── api
│ │ └── logs
│ │ └── order
│ │ └── users
│ ├── app
│ ├── database
| | └── models
| │ └── migrations
| │ └── queries
│ ├── services
| | └── rabbitmq
│ ├── shared
│ ├── main.ts
└── package.json
