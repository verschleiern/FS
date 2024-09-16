README file for your **Fruit Store Web Application** project. Please use the link to access the demonstration of the web app here https://verschleiern.github.io/FS/
---

# Fruit Store Web Application

The **Fruit Store** is a full-stack web application designed as an online point-of-sale (POS) system for managing and purchasing fruits. It is built using modern web technologies with a focus on scalability and user experience. The project includes a frontend built with React, a backend built with Node.js, and MongoDB as the database.

## Table of Contents
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing](#testing)
- [Submodules](#submodules)
- [Contributing](#contributing)
- [License](#license)

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime for backend development.
- **Express.js**: Web framework for building the RESTful API.
- **MongoDB**: NoSQL database for storing product and order data.
- **Mongoose**: ODM library for MongoDB, simplifying data modeling.

### Frontend
- **React**: A JavaScript library for building user interfaces.
- **React Router**: For handling routing within the application.
- **Axios**: For making HTTP requests from the frontend to the backend.
- **Bootstrap**: For building responsive, mobile-first UIs.

### Database
- **MongoDB / MongoDB atlas**: Used to store product information, order data, and customer details.

## Features
- **View Fruits**: Displays a list of available fruits.
- **Add to Cart**: Allows users to add fruits to their shopping cart.
- **Order Placement**: Users can place orders by entering shipping details.
- **Order Management**: Admins can manage and track customer orders.
- **RESTful API**: Backend provides a full CRUD API for managing fruits and orders.

## Project Structure

```plaintext
C:/Users/DES DES/Documents/FS/
├── backend/
│   ├── models/
│   │   ├── Fruit.js          # Mongoose model for fruits
│   │   └── Order.js          # Mongoose model for orders
│   ├── routes/
│   │   ├── fruits.js         # Routes for managing fruits
│   │   └── orders.js         # Routes for managing orders
│   ├── server.js             # Entry point for backend server
│   ├── seed.js               # Seed script to populate the database
│   └── package.json          # Backend dependencies
├── frontend/                 # Frontend (submodule)
│   └── ...                   # React app structure
├── .gitignore
├── README.md                 # This file
└── package.json              # Main project dependencies
```

## Installation

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js**: v14.x or higher
- **npm**: v6.x or higher (comes with Node.js)
- **MongoDB**: A running MongoDB instance
- **Git**: For cloning and managing repositories

### Clone the Repository
To clone the repository, run:

```bash
git clone https://github.com/verschleiern/FS.git
cd FS
```

### Initialize Submodules
This project uses a frontend as a Git submodule. To initialize the submodule, run:

```bash
git submodule init
git submodule update
```

### Backend Setup

1. Navigate to the backend folder:

   ```bash
   cd backend
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Seed the database (optional):

   If you want to populate the database with sample fruits, run:

   ```bash
   node seed.js
   ```

### Frontend Setup

1. Navigate to the frontend submodule:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

## Environment Variables

You need to set up environment variables to configure the project. Create a `.env` file in the `backend` folder and add the following values:

```bash
MONGODB_URI=mongodb://localhost:27017/fruit-store 
PORT=5000
```

### Example .env File:

```
MONGODB_URI=mongodb://localhost:27017/fruit-store
PORT=5000
```

## Usage

### Running the Backend

1. Start MongoDB on your machine. IF IT mongodb atlas: mongodb+srv://ys:**PASSWORDREMOVED**@fruitstore.gpkqf.mongodb.net/?retryWrites=true&w=majority&appName=FruitStore
2. Navigate to the backend folder and run the server:

   ```bash
   cd backend
   npm start
   ```

   This will start the backend server at `http://localhost:5000`.

### Running the Frontend

1. Navigate to the `frontend` folder.
2. Run the React development server:

   ```bash
   cd frontend
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

### Accessing the Application

Once both the backend and frontend are running, visit `http://localhost:3000` in your browser to access the Fruit Store web application.

## Testing

To run tests for the backend, you can use `Jest` or `Mocha` (if added). Simply run the following command in the backend directory:

```bash
npm test
```

For frontend testing, use `React Testing Library`:

```bash
npm test
```

## Submodules

This project includes the frontend as a submodule. If you ever need to update the frontend submodule, use the following commands:

```bash
git submodule update --remote frontend
git commit -am "Updated frontend"
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README should give developers a clear understanding of how to use and contribute to your project. Feel free to customize it further based on your project requirements!
