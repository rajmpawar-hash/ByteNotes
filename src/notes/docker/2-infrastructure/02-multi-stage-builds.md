# Multi-Stage Builds (Industry Standard)

> [!TIP]
> **The 30-Second Interview Pitch**
> *"Multi-Stage Builds are an advanced Docker pattern used to drastically reduce the final image size of compiled languages (like TypeScript or Go). Instead of shipping a massive image containing compilers, raw source code, and `devDependencies`, a multi-stage `Dockerfile` uses a 'Builder' stage to compile the code, and then copies *only* the final compiled artifacts into a fresh, lean production image. This reduces attack surfaces and deployment times."*

If you write a standard `Dockerfile` for a **TypeScript** Node.js application, you will end up shipping the TypeScript compiler (`tsc`), testing libraries (`jest`), and thousands of raw `.ts` files into production. Your image will be 500MB+.

A Senior Developer uses **Multi-Stage Builds** to shrink that image down to 50MB.

## The Architecture of a Multi-Stage Build

A Multi-Stage `Dockerfile` has multiple `FROM` statements. Each `FROM` starts a new "Stage". You can copy files from previous stages, leaving all the heavy garbage behind!

### The Multi-Stage TypeScript `Dockerfile`

```dockerfile
# ==========================================
# STAGE 1: The "Builder"
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install ALL dependencies (including devDependencies like TypeScript)
COPY package*.json ./
RUN npm install

# Copy the raw TypeScript source code
COPY . .

# Compile the TypeScript to JavaScript (dumps to a /dist folder)
RUN npm run build


# ==========================================
# STAGE 2: The "Production" Image
# ==========================================
# We start completely fresh! Nothing from Stage 1 exists here yet.
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy ONLY package.json and install ONLY production dependencies
# (We don't need TypeScript or Jest anymore!)
COPY package*.json ./
RUN npm install --only=production

# 🪄 THE MAGIC: Copy ONLY the compiled JavaScript from the 'builder' stage!
COPY --from=builder /usr/src/app/dist ./dist

# Security best practice
USER node

EXPOSE 3000

# Run the compiled JS file
CMD ["node", "dist/index.js"]
```

## Why this is an Interview "Flex"

If you explain this concept in an interview, you prove:
1. **Security Awareness:** You know that leaving compilers and test frameworks in production images increases the risk of a hacker exploiting them (reducing the Attack Surface).
2. **Infrastructure Optimization:** A 50MB image can be pulled from a registry and booted by Kubernetes in less than 2 seconds. A 500MB image might take 20 seconds, causing massive latency during auto-scaling events.
