# Docker Compose: Node.js + PostgreSQL

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Docker Compose is a tool for defining and running multi-container Docker applications. Instead of manually running a dozen `docker run` commands with complex networking flags, you define your entire infrastructure (e.g., a Node.js API, a PostgreSQL database, and a Redis cache) in a single declarative `docker-compose.yml` file. You can then spin up the entire stack with a single command: `docker-compose up`."*

If you are asked how you handle local development with multiple databases, **Docker Compose** is the industry standard answer. 

## The Problem `docker-compose` Solves

Imagine you have a Node.js API that needs to connect to PostgreSQL. Without compose, you would have to:
1. Create a custom Docker Network.
2. Run the Postgres container and attach it to the network.
3. Build your Node API image.
4. Run your Node container, pass in the Postgres URL as an environment variable, and attach it to the network.

This is tedious. Docker Compose automates it.

## Infrastructure & Setup: The `docker-compose.yml`

Create a file named `docker-compose.yml` at the root of your Node.js project (next to your `Dockerfile`).

```yaml
# 1. The version of the compose specification
version: '3.8'

# 2. Services represent the different containers we want to run
services:
  
  # --- THE DATABASE SERVICE ---
  postgres-db:
    # We don't need a Dockerfile for this, we just pull the official image
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: supersecretpassword
      POSTGRES_DB: my_database
    ports:
      # Map host port 5432 to container port 5432 (so we can use DBeaver/PgAdmin locally)
      - '5432:5432'
    volumes:
      # Map the container's data folder to a Docker volume so data survives restarts!
      - pgdata:/var/lib/postgresql/data

  # --- THE NODE.JS API SERVICE ---
  api:
    # Build the image using the Dockerfile in the current directory (.)
    build: .
    # Automatically restart if the Node app crashes
    restart: always
    ports:
      - '3000:3000'
    environment:
      # MAGIC: Docker Compose automatically handles DNS resolution!
      # Notice the host is "postgres-db" (the name of the service above), NOT localhost!
      DATABASE_URL: postgres://admin:supersecretpassword@postgres-db:5432/my_database
    depends_on:
      # Tells compose to start the DB before starting the API
      - postgres-db

# 3. Volumes declaration
volumes:
  pgdata:
```

## How to use it

To spin up this entire architecture, you simply run:
```bash
# Starts all containers in the background (-d)
docker-compose up -d
```

To tear it all down:
```bash
docker-compose down
```

> [!IMPORTANT]
> **The DNS Magic (Interview Gotcha)**
> If an interviewer asks: *"How does the Node API know the IP address of the Postgres container?"*
> The answer is **Docker's Internal DNS**. Docker Compose automatically creates a bridge network and places both containers inside it. It then assigns DNS records matching the service names. Because we named our service `postgres-db`, our Node app can literally connect to `http://postgres-db:5432`!
