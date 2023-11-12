
# MyApp Test Backend Dev
This repo using Monorepo to handle multiple application service in one repo




## Authors

- [@Apriadi](https://github.com/apriadi4494)


## Run Locally

Clone the project

```bash
  git clone https://github.com/apriadi4494/myApp-test.git
```

Go to the project directory

```bash
  cd project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev-user
  npm run start:dev-chat
```

## Run With Docker

```bash
  git clone https://github.com/apriadi4494/myApp-test.git
```

Go to the project directory

```bash
  docker compose up
```
## API Reference

#### User Service Documentation

```http
 http://myapp/user-service/api-docs
```


#### Chat Service Documentation

```http
 http://myapp/chat-service/api-docs
```



## Tech Stack

**Tools:** Docker, Nginx, Socket, RabbitMq

**Server:** Node, Nestjs

**Database:** Mongodb

