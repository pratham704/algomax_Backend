# Project Name

## Overview

This Node.js project follows a modular architecture to facilitate scalability and maintainability. It utilizes ES6 modules, environment-based configuration, and a comprehensive set of tools and libraries to build a robust application.

## Project Structure

- **`config/`**
  - `env/`
    - `development.js`
    - `production.js`
    - `test.js`
  - `config.js`
  - `constants.js`
  - `database.js`
- **`controllers/`**
  - `auth/`
    - `auth.student.controller.js`
  - `student.controller.js`
- **`middlewares/`**
  - `auth.middleware.js`
  - `errorHandlers.js`
  - `validate.middleware.js`
- **`models/`**
  - `student.model.js`
  - `teacher.model.js`
- **`routes/`**
  - `student.routes.js`
- **`services/`**
  - `auth/`
    - `auth.service.student.js`
  - `student.service.js`
  - `teacher.service.js`
  - `z.create.table.query.js`
- **`tests/`**
- **`utils/`**
  - `auth/`
    - `bcrypt.password.js`
    - `jwt.utils.js`
  - `responses/`
    - `mysql.ErrorMap.js`
    - `responses.js`
    - `status.messages.js`
- **`validators/`**: Request validation do it for each table validate it 
  - `student.validator.js`


## Project Flow

1. **Request Handling:**
   - **Entry Point:** The application starts with `index.js` or `server.js` (for vertical scaling applications).
   - **Routes:** Requests are routed through the defined routes in the `routes/` directory.

2. **Middleware:**
   - **Authentication and Validation:** Middleware functions handle authentication and validation before requests reach the controllers. Middleware functions are located in the `middlewares/` directory.

3. **Controllers:**
   - **Business Logic:** Controllers manage the request and response cycle. They interact with services to perform operations and are located in the `controllers/` directory.

4. **Services:**
   - **Model Interactions:** Services contain the business logic and interact with the database through models. They are located in the `services/` directory.

5. **Error Handling and Responses:**
   - **Errors and Responses:** Errors are handled, and responses are formatted using utilities before being sent back to the client. Error handling and response utilities are located in the `utils/` directory.

6. **Final Response:**
   - **Utils:** Utilities for formatting responses and handling various tasks are used to finalize and send the response. These utilities are also located in the `utils/` directory.

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/pratham704/starter-mysql2.git
   cd starter-mysql2
   ```

2. **Remove the package.json and package-lock.json:**

   ```bash
   rm package.json package-lock.json
   ```

3. **Create new package.json:**

   ```bash
   npm init -y
   ```

4. **Use ES6 syntax, add the following line to your [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2FUsers%2Fprath%2FOneDrive%2FDesktop%2Fstarter%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "c:\Users\prath\OneDrive\Desktop\starter\package.json") file:**

   ```json
   {
     "type": "module"
   }
   ```

5. **Install new packages:**

   ```bash
   npm i bcrypt bcryptjs cookie-parser cors dotenv express express-rate-limit helmet joi jsonwebtoken mysql mysql2 nodemon uuid
   ```

6. **Start the server:**

   ```bash
   npm start
   npm run dev
   nodemon index.js
   ```

7. **For Vertical Scaling:**

   ```bash
   nodemon server.js
   ```
 
8. **create a .env file**

    ```bash
    NODE_ENV=development

    DEV_PORT=4000
    DEV_DB_HOST=localhost
    DEV_DB_USER=devuser
    DEV_DB_NAME=devdb
    DEV_DB_PASS=devpassword

    PROD_PORT=80
    PROD_DB_HOST=prod-db-host
    PROD_DB_USER=prod-user
    PROD_DB_NAME=prod-db
    PROD_DB_PASS=prod-password

    TEST_PORT=3001
    TEST_DB_HOST=localhost
    TEST_DB_USER=testuser
    TEST_DB_NAME=testdb
    TEST_DB_PASS=testpassword

    JWT_SECRET_KEY_DEV=devsecretkey
    JWT_SECRET_KEY_PROD=prodsecretkey
    JWT_SECRET_KEY_TEST=testsecretkey

    ALLOWED_ORIGINS=http://example.com,http://anotherdomain.com,http://localhost:3000,http://localhost:5000,http://localhost:3001,http://localhost:4000
    ```
    