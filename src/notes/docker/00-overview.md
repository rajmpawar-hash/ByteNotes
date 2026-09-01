# 🐳 Docker — Master Navigation Hub

Welcome to the Docker Master Guide. Docker is the industry standard platform for containerization, allowing developers to package applications and their dependencies into a single, standardized unit for software development.

This guide focuses heavily on **Infrastructure and Setup**, specifically tailored to how Node.js and PostgreSQL operate within a containerized environment.

## 📂 Section Index

### ⚙️ 1. Core Architecture (Interview Critical)
| Section | Topics |
|:--------|:-------|
| [**01-containers-vs-vms**](/docker/1-core-architecture/01-containers-vs-vms) | The classic interview question: How Docker differs from Virtual Machines, and Images vs Containers. |

### 🏗️ 2. Infrastructure & Setup (Node.js)
| Section | Topics |
|:--------|:-------|
| [**01-node-dockerfile**](/docker/2-infrastructure/01-node-dockerfile) | Writing the perfect `Dockerfile` for a Node.js application. |
| [**02-multi-stage-builds**](/docker/2-infrastructure/02-multi-stage-builds) | A senior-level pattern for drastically reducing Docker image sizes for production. |

### 🎼 3. Orchestration (Node + Database)
| Section | Topics |
|:--------|:-------|
| [**01-docker-compose-pg**](/docker/3-orchestration/01-docker-compose-pg) | Using `docker-compose` to spin up a Node.js API and a PostgreSQL database simultaneously. |

### 💾 4. Data & Networking in the Industry
| Section | Topics |
|:--------|:-------|
| [**01-volumes-and-networks**](/docker/4-data-and-networking/01-volumes-and-networks) | Preventing data loss when a database container crashes, and how containers communicate. |
