# Production-Grade E-Commerce REST API Engine

An enterprise-ready, high-performance backend system engineered with Node.js, Express, and native MongoDB. This platform implements strict production paradigms, including a **Feature-Driven Separation of Concerns Archetype**, fully decoupled **Controller-Repository Database Abstractions**, stateless asymmetric cryptographic token authorization, global fault isolation boundaries, and high-throughput logging streams.

---

## 🏛️ Architectural Architecture & Design Patterns

The architecture reflects mission-critical enterprise design patterns, ensuring that business logic is completely isolated from the transport, data access, and execution layers.

```text
src/
├── config/                  # Global connection pools & infrastructure bootstrapper
├── error-handler/           # Deterministic fault isolation & centralized exception boundaries
├── middlewares/             # Non-functional requirements (Security, Ingestion pipelines, IO stream tracking)
└── features/                # Domain-Driven Modularity (Cohesive business context isolation)
    ├── user/                # Identity Abstraction Layer (Controller -> Repository -> Db)
    ├── product/             # Inventory Abstraction Layer
    └── cart/                # Transactional In-Memory Cache Processing (Staging Area)

```

### 🧠 Strategic Design Decisions

* **Feature-Driven Modularity (Domain Isolation):** Instead of classic horizontal layers (`controllers/`, `models/`, `routes/`) which incur severe cognitive load and code-fragmentation during feature scaling, this architecture isolates components into self-contained vertical domain features (`user`, `product`, `cart`). This enforces strict domain boundaries and maximizes developer velocity.
* **Controller-Repository Pattern (Data Access Decoupling):** Database interactions are abstracted through low-level Repository classes utilizing native driver execution blocks. Controllers do not inherit database awareness; they speak strictly to the abstraction layer. This separates the protocol engine (HTTP/REST) entirely from the persistence schema (MongoDB Collections).
* **Active vs. Persistent State Modeling:** Utilizes a dual persistence paradigm, combining high-speed native memory models for ephemeral state orchestration (e.g., lightweight staging carts) alongside persistent transactional write-paths directly bound to MongoDB clusters.

---

## 🔒 Non-Functional Engineering Deep-Dives

### 1. Identity, Cryptography, and Authorization Access Boundary

* **Adaptive Hashing Vectors:** Implements password salting and hashing utilizing `Bcrypt` with an adaptive computational work factor of 12 rounds, effectively neutralizing brute-force and pre-computed rainbow table attack vectors.
* **Stateless Session Tokens:** Authorization is strictly state-decoupled via JSON Web Tokens (`JWT`) signed with dynamic, cryptographically secure keys held in root system configurations, implementing role-based state context parsing through an isolated, context-aware routing pipeline.

### 2. Stream Ingestion Pipeline & Optimized Queries

* **Binary Object Processing:** Native multi-part form ingestion streams process binary file assets utilizing optimized streaming disks, decoupling file structural payloads via uniquely deterministic timestamped hashes into secure storage zones.
* **Optimized Query Boundaries:** Complex product querying relies on dynamically evaluated multi-field query matrices containing polymorphic filtering bounds (`$gte`, `$lte`, categorical regex matrices), explicitly executing index-friendly paths on the backend database layer.

### 3. Observability, Metrics, & Centralized Logging

* **High-Velocity Logging Stream:** Integrates the Winston logging framework configured with high-performance async streaming file transports.
* **Structural Context Capturing:** All HTTP execution lifecycles, incoming query params, request structural mutations, and performance vectors are systematically serialized to structural JSON logs inside `log.txt`, providing instant data compatibility with external log aggregators like Datadog or ELK Stacks.

### 4. Global Fault Isolation & Centralized Error Boundary

* The API enforces a zero-crash operational policy via a dedicated global exception interceptor middleware.
* Uncaught execution errors are caught, evaluated, stripped of private runtime stack traces to prevent reverse-engineering vectors, and returned via deterministic HTTP semantics using a highly descriptive custom `ApplicationError` payload framework.

---

## 📋 Comprehensive API Specification & Operational Contract

All requests accept standard JSON payloads or `multipart/form-data` where file processing is explicitly defined. Response tracking strictly enforces semantic HTTP codes.

### Identity & Authentication Domain (`/api/users`)

| Verbs | Endpoint | Auth | Request Payload Type | Functional Responsibility |
| --- | --- | --- | --- | --- |
| **POST** | `/api/users/signup` | Public | `application/json` | Registers a new actor; executes password mutation vectors through the Bcrypt layer. |
| **POST** | `/api/users/signin` | Public | `application/json` | Evaluates credentials against the database layer; issues cryptographically signed JWT. |

### Inventory & Product Engine (`/api/products`)

| Verbs | Endpoint | Auth | Request Payload Type | Functional Responsibility |
| --- | --- | --- | --- | --- |
| **GET** | `/api/products` | Public | None | Streams the full index array from the persistent store collection. |
| **GET** | `/api/products/:id` | Public | None | Locates a specific item document by casting the payload string directly into a native `ObjectId`. |
| **GET** | `/api/products/filter` | Public | Query Parameters | Executes an optimization query filter targeting `minPrice`, `maxPrice`, or `category`. |
| **POST** | `/api/products` | Public | `multipart/form-data` | Ingests a new item configuration alongside a binary multipart upload stream (`imageUrl`). |
| **POST** | `/api/products/rating` | **JWT** | `application/json` | Enforces structural multi-field update parameters to record or dynamically mutate an atomic rating array matrix. |

### Transactional Staging Cart Engine (`/api/cart`)

| Verbs | Endpoint | Auth | Request Payload Type | Functional Responsibility |
| --- | --- | --- | --- | --- |
| **POST** | `/api/cart` | **JWT** | Query Parameters | Binds an execution quantity constraint of a defined item to the context-extracted User ID. |
| **GET** | `/api/cart` | **JWT** | None | Evaluates active contextual tokens to pull matching in-memory active staging allocations. |
| **DELETE** | `/api/cart/:id` | **JWT** | None | Performs atomic record evacuation on individual cart line allocations based on user bounds. |

---

## ⚙️ Infrastructure & Environment Layer Blueprint

System bootstrap scripts rely on clean environment boundaries. Create a production secure configuration file named `.env` in the project root directory. Do not commit this file to version control.

```env
# Network Ingestion Parameters
PORT=3000

# High-Availability Database Persistence Pool Bounds
DB_URL=mongodb+srv://<db_user>:<db_password>@cluster0.mongodb.net/ecom_db?retryWrites=true&w=majority

# Asymmetric Cryptographic Session Secret Vector
JWT_SECRET=fe839db080e72bc837e3d15a5130b42fd290bf43719a84d412e8310ba23d2bc7

```

---

## 🛠️ Deterministic Lifecycle Local Setup

Follow this sequence to instantiate a deterministic local execution space.

### 1. Initialize Clone Configuration

```bash
git clone https://github.com/manasrajdeep/E-Com-API-Backend.git
cd E-Com-API-Backend

```

### 2. Execute Dependency Lock Locking

Installs accurate package bounds based identically on the committed transaction footprint:

```bash
npm ci

```

### 3. Initialize Runtime Context

Ensure your local or cloud Atlas MongoDB cluster is fully provisioned, verify environment parameters inside your configuration file, and execute the startup target thread:

```bash
npm start

```

---

## 🏁 Production Readiness Verification Checklist

Prior to migrating the codebase to infrastructure orchestrators (AWS ECS, Kubernetes, etc.), ensure the following operational guardrails are confirmed:

* [ ] **Secret Management Encapsulation:** Verify no dynamic string files like `.env`, `env.js`, or generated execution state structures like `log.txt` or `uploads/` remain tracked by version control index points.
* [ ] **Persistent Store Performance:** Ensure target querying properties (`price`, `category`) contain properly compiled ascending indices on the target database clusters to prevent exhaustive scan fallbacks.
* [ ] **Cryptographic Hardening Vector:** Swap out standard placeholder string vectors within `JWT_SECRET` keys for fully randomized 256-bit hexadecimal parameters inside live container orchestration secret spaces.
