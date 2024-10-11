# Ridesense Task API

This API is designed with production-grade practices, following clean, scalable, and modular architecture using NestJS, Prisma ORM, Zod for validation, and Winston for logging. It is highly maintainable, efficient, and secure, with a Husky pre-commit hook enforcing build-error-free development.

---

## Installation and Setup

### Step 1: Clone the Repository

First, clone the project from the repository to your local machine:

```bash
git clone https://github.com/mehulambastha/ridesense-bike-crud.git
cd ridesense-task
```

### Step 2: Install Dependencies

Next, install the dependencies using npm:

```bash
npm install
```

This will install all the required Node.js packages, including NestJS, Prisma, and Jest for testing.

### Step 3: Setup Prisma (Database)

1. **Generate the Prisma Client**:
   Prisma needs to generate a client to interact with the database. To do this, run:

   ```bash
   npx prisma generate
   ```

2. **Run Prisma Migrations**:
   Apply the necessary migrations to set up the database schema:

   ```bash
   npx prisma migrate dev
   ```

   This will create the necessary tables and relationships for the project in your database.

### Step 4.1: Create .env file from the .env.example file provided.
```bash
cp .env.example .env
```
Enter your db url and preferred PORT in the env file

### Step 4.2: Run the Development Server

Start the development server:

```bash
npm run start:dev
```
 
The API will be running in watch mode, automatically restarting upon file changes.

### Step 5: Building for Production

To build and run the project in a production environment:

1. Build the project:

   ```bash
   npm run build
   ```

2. Start the production server:

   ```bash
   npm run start:prod
   ```

---

## Functionality Highlights

1. **Modular Architecture**:
   The code is divided into specific modules (e.g., `BikeModule`, `PrismaModule`), which segregates different concerns of the application. This results in more maintainable and extendable code that is easy to follow.

2. **Zod for Validation**:
   The API uses Zod for validating input data, enforcing strict type-checking. This prevents malformed data from being processed, improving both data integrity and security.

3. **Prisma ORM**:
   Prisma is used as the Object-Relational Mapper (ORM), allowing for seamless database interactions with type safety and easy schema migrations. This ensures robust data handling and easy manipulation of database records.

4. **Swagger API Documentation**:
   Swagger auto-generates documentation for the API, making it easier for developers to explore and test the various endpoints. This is particularly useful for external developers who want to integrate or explore the system.

---

## Production-Grade Practices

1. **Custom Winston Logging with File Rotation**:
   Winston is used for structured logging, and log file rotation is implemented to ensure that log files do not grow too large and become unmanageable. This helps in maintaining performance and allows efficient log analysis in a production environment.

2. **Pre-Commit Hook with Husky**:
   A Husky pre-commit hook is implemented to ensure that only build-error-free code is pushed to the repository. It runs tests and linting checks before every commit, ensuring that development and staging environments always remain stable and bug-free.

3. **Global Exception Filters**:
   Global exception filters in NestJS ensure that errors across the application follow a consistent structure. This standardization makes debugging and handling errors more predictable, improving the overall reliability of the system.

4. **Swagger for API Testing**:
   Swagger documentation provides a simple and intuitive interface for testing and inspecting the API. This makes it easier for developers to test endpoints and understand the API structure without needing external tools like Postman.

5. **Modularized and Segregated Code**:
   The project is designed in a modular way, where each module is responsible for a specific concern. This separation of concerns leads to better code organization, reduced complexity, and easier testing and debugging.

---

## Running Tests

To ensure the code is functioning correctly, unit tests have been written and can be run using Jest. Here’s how you can run the tests:

1. Run all tests:

   ```bash
   npm run test
   ```

2. Run tests in watch mode (re-runs on file changes):

   ```bash
   npm run test:watch
   ```

3. Check test coverage:

   ```bash
   npm run test:cov
   ```

---

## API Documentation

The API documentation can be accessed via Swagger by visiting the following URL:

```
http://localhost:PORT/api
```

Here, you can interact with the API, view available endpoints, and test different inputs directly from the browser.

---

## Some Screenshots of the API in progress.
### SwaggerUI Overview
![ridesense1](https://github.com/user-attachments/assets/cc3a81c0-aa2a-4022-8bbb-b92842005361)
### GET Request on Home Route
![ridesense2](https://github.com/user-attachments/assets/1d9b489c-d962-4923-be3b-97a7903ef9e8)
### Server Logs
![ridesense11](https://github.com/user-attachments/assets/5be6e750-1efa-4e90-a1c7-de810ea78090)
### DELETE Method
![ridesense10](https://github.com/user-attachments/assets/e7489d50-dcf7-4c6c-8756-acb1c1cade58)
### PATCH Method
![ridesense9](https://github.com/user-attachments/assets/81d01611-f5a2-4830-9335-21f0ecea9b48)
### GET specific bike information 
![ridesense8](https://github.com/user-attachments/assets/b4addf4f-c987-435b-b9f6-0f6094ed1e35)
### POST Method (creating bike but with invalid data)
![ridesense7](https://github.com/user-attachments/assets/e8f78624-c406-4db7-8aed-a59b60968c2c)
![ridesense6](https://github.com/user-attachments/assets/9d4cacce-f198-47fe-9c0f-827b8c5854af)
### POST Method with valid data
![ridesense4](https://github.com/user-attachments/assets/0bb635f8-6c6f-404e-8a04-8af4a1bad454)
![ridesense5](https://github.com/user-attachments/assets/23d14349-2c31-45a3-90be-f09aa358dde1)
### GET All Bikes
![ridesense3](https://github.com/user-attachments/assets/301874ca-773f-4993-aefd-6849852b3eb0)
