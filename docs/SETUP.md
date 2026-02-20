# Setup Instructions for SMS Communication Platform

Welcome to the setup guide for the SMS Communication Platform. Follow these instructions to set up your development environment.

## Prerequisites
Before you begin, make sure you have the following software installed:

- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **Git**
- **MongoDB** (latest version)

You can download it from [Node.js](https://nodejs.org/), [npm](https://www.npmjs.com/), and [MongoDB](https://www.mongodb.com/try/download/community).

## Step 1: Clone the Repository
First, clone the repository to your local machine:
```bash
git clone https://github.com/LightOfChristmasDriveThru/sms-communication-platform.git
cd sms-communication-platform
```

## Step 2: Install Dependencies
Navigate to the project directory and install the required Node.js packages:
```bash
npm install
```

## Step 3: Set Up Environment Variables
Create a `.env` file in the root directory of the project with the following variables:
```
DB_URI=mongodb://localhost:27017/sms-db
PORT=3000
SECRET_KEY=your_secret_key
```
Make sure to replace `your_secret_key` with a secure value.

## Step 4: Run the Application
You can now start the application:
```bash
npm start
```
The application should now be running on `http://localhost:3000`.

## Step 5: Run Tests
To ensure everything is working correctly, run the tests:
```bash
npm test
```

## Additional Resources
For more information, check the following resources:
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

If you have any issues, please open an issue in the repository!  
