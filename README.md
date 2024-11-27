Here’s the updated `README.md` with the mention of blockchain features and implementation as "coming soon."

---

# VoteSphere

VoteSphere is a decentralized voting application designed for secure and transparent election management. It enables users to create elections, cast votes, and view results. Administrators can manage elections through backend APIs. 

> **Note:** Blockchain implementation is currently in progress and will be added soon to enhance security and transparency.

---

## Getting Started

Follow the instructions below to clone the repository, set it up locally, and run the application.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) (for backend API testing, optional)

---

### Cloning the Repository

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/dav1d001/votesphere.git
   ```

2. Navigate to the project folder:
   ```bash
   cd votesphere
   ```

---

### Running the Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` folder and add the following:
   ```plaintext
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   The backend will run at `http://localhost:5000`.

5. Use Postman to test backend functionality like creating elections or viewing results. For example:
   - **Create Election:** Send a POST request to `http://localhost:5000/api/elections` with the required fields.

---

### Running the Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the `src/api/axios.js` file:
   Ensure the `baseURL` points to your backend server (e.g., `http://localhost:5000/api`).

4. Start the frontend development server:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

---

### Key Features

- **Users:** Register, log in, and vote in elections.
- **Admins:** Use Postman or similar tools to create and manage elections.
- **Results:** View real-time election results.
- **Blockchain:** Blockchain-based voting features are coming soon to enhance security, transparency, and immutability.

---

## Note

For deployment and additional configuration, refer to the full project documentation or contact the maintainer.

---
