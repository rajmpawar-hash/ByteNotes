# Writing a Node.js Dockerfile

> [!TIP]
> **The 30-Second Interview Pitch**
> *"A Dockerfile is a step-by-step declarative script used to build a Docker Image. For a Node.js application, industry best practices include using a lightweight base image (like `node:alpine`), copying `package.json` before the rest of the source code to leverage Docker's layer caching mechanism, and running the application as a non-root user for security."*

If you are asked to "Dockerize" a Node.js application, do not just throw commands together. There is a very specific order of operations designed to optimize build speed and security.

## The Perfect Node.js Dockerfile (Basic)

Here is a production-ready `Dockerfile` for a standard Express.js application, heavily commented with the "Why" behind the architecture choices.

```dockerfile
# 1. BASE IMAGE: Use Alpine Linux. It is incredibly small (~5MB) compared to standard Ubuntu images.
FROM node:18-alpine

# 2. WORKDIR: Set the working directory inside the container. 
# All subsequent commands (COPY, RUN, CMD) will be executed here.
WORKDIR /usr/src/app

# 3. CACHE OPTIMIZATION: Copy ONLY the package files first.
# Docker caches each layer. If we don't change our dependencies, Docker will use the cached 
# npm install layer, saving minutes on subsequent builds!
COPY package*.json ./

# 4. INSTALL: Install production dependencies
RUN npm install --only=production

# 5. COPY SOURCE CODE: Now we copy the rest of our application code.
# Ensure you have a .dockerignore file so you don't copy the local node_modules!
COPY . .

# 6. SECURITY: By default, Docker runs as 'root'. This is a massive security risk.
# Node images come with a built-in 'node' user with limited privileges. We switch to it.
USER node

# 7. EXPOSE: Document the port the app listens on (this doesn't actually publish the port, it's just documentation)
EXPOSE 3000

# 8. START COMMAND: The command that runs when the CONTAINER boots up.
# Use CMD instead of RUN. (RUN executes during the image build, CMD executes at runtime).
CMD ["node", "index.js"]
```

## Infrastructure & Setup: Building and Running

To actually use this `Dockerfile` in a real-world scenario, you run these commands in your terminal:

### 1. The `.dockerignore` file
Always create this file next to your `Dockerfile`. If you copy your local Windows/Mac `node_modules` into a Linux container, the native C++ bindings will crash!
```text
node_modules
npm-debug.log
.git
```

### 2. Building the Image
This command reads the `Dockerfile` in the current directory (`.`) and tags (`-t`) it with a name.
```bash
docker build -t my-node-api .
```

### 3. Running the Container
This spins up the container in detached mode (`-d`) so it runs in the background, and maps port 80 on your host machine to port 3000 inside the container (`-p`).
```bash
docker run -d -p 80:3000 my-node-api
```
