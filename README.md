# Micro Service Skeleton – Developer Guide

This project contains two main parts:
- **user-management-api**: The backend API (NestJS + Prisma + PostgreSQL)
- **user-management-ui**: The frontend UI (React + Vite + TailwindCSS)

---

## Prerequisites

- **Node.js** (v18+ recommended): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (for local development database): [Download PostgreSQL](https://www.postgresql.org/download/)
- **Git** (optional, for cloning the repo): [Download Git](https://git-scm.com/downloads)

---

## 1. Clone the Repository

```bash
git clone <your-repo-url>
cd micro_service_skeleton_w2
```

---

## 2. Backend Setup (`user-management-api`)

### A. Install Dependencies

```bash
cd user-management-api
npm install
```

### B. Configure Environment

1. **Create a `.env` file** in `user-management-api/` with the following content (adjust as needed):

    ```
    DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>?schema=public"
    JWT_SECRET="your_jwt_secret"
    ```

    - Replace `<username>`, `<password>`, and `<database_name>` with your PostgreSQL credentials.

2. **Example for local Postgres:**

    ```
    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/userdb?schema=public"
    JWT_SECRET="supersecret"
    ```

### C. Set Up the Database

1. **Create the database** in PostgreSQL (if not already created):

    ```sql
    CREATE DATABASE userdb;
    ```

2. **Run Prisma Migrations:**

    ```bash
    npx prisma migrate deploy
    # or for development
    npx prisma migrate dev
    ```

3. **(Optional) Generate Prisma Client:**

    ```bash
    npx prisma generate
    ```

### D. Run the Backend Server

```bash
npm run start:dev
```

- The API will be available at `http://localhost:3000/` by default.

---

## 3. Frontend Setup (`user-management-ui`)

### A. Install Dependencies

```bash
cd ../user-management-ui
npm install
```

### B. Configure API Endpoint

- By default, the frontend expects the API at `/api`.
- For local development, you may need to set up a proxy in `vite.config.ts`:

    ```js
    // vite.config.ts
    export default defineConfig({
      // ...
      server: {
        proxy: {
          '/api': 'http://localhost:3000',
        },
      },
    });
    ```

- If you deploy the API elsewhere, update the fetch URLs in `src/services/api.ts` or similar.

### C. Run the Frontend

```bash
npm run dev
```

- The UI will be available at `http://localhost:5173/` (or as shown in your terminal).

---

## 4. Common Developer Tasks

### A. Running Tests

- **Backend:**  
  ```bash
  cd user-management-api
  npm run test
  ```
- **Frontend:**  
  (Add test scripts as needed, e.g., with Jest or Vitest.)

### B. Linting & Formatting

- **Backend:**  
  ```bash
  npm run lint
  npm run format
  ```
- **Frontend:**  
  ```bash
  npm run lint
  npm run format
  ```

### C. Environment Variables

- Store secrets and config in `.env` files (never commit secrets to git).
- Use `.env.example` as a template for new developers.

---

## 5. Troubleshooting

- **Port Conflicts:**  
  Change the default ports in `main.ts` (API) or `vite.config.ts` (UI) if needed.
- **Database Connection Issues:**  
  Double-check your `DATABASE_URL` and ensure PostgreSQL is running.
- **CORS Issues:**  
  The backend should have CORS enabled for local development. Adjust as needed in the NestJS main file.

---

## 6. Project Structure

```
micro_service_skeleton_w2/
  ├── user-management-api/   # NestJS backend
  └── user-management-ui/    # React frontend
```

---

## 7. Useful Commands

| Task                        | Command                                 |
|-----------------------------|-----------------------------------------|
| Install dependencies        | `npm install`                           |
| Run backend (dev)           | `npm run start:dev` (in API folder)     |
| Run frontend (dev)          | `npm run dev` (in UI folder)            |
| Run Prisma migrations       | `npx prisma migrate dev`                |
| Generate Prisma client      | `npx prisma generate`                   |
| Run backend tests           | `npm run test`                          |
| Lint code                   | `npm run lint`                          |

---

## 8. Contributing

- Fork and branch for new features.
- Use clear commit messages.
- Run tests and lint before PRs.

---

## 9. Further Reading

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

---

**For any issues, contact the project maintainer or open an issue in the repository.**
