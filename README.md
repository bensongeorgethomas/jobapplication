# Student Job Tracker

A full-stack MERN (MongoDB, Express, React, Node.js) application designed for students to track and manage their job applications during the job search process.

## Features

- **User Authentication:** Register, login, and secure user profiles
- **Job Application Tracking:** Add, edit, and delete job applications
- **Dashboard:** View job application statistics and status
- **Status Updates:** Track application status (Applied, Interview, Offer, Rejected, Saved)
- **Filtering & Sorting:** Filter job applications by status, company, position, etc.
- **Responsive Design:** Works on desktop and mobile devices

## Technology Stack

### Frontend
- React.js
- Context API for state management
- React Router for navigation
- Modern ES6+ JavaScript
- CSS3 with responsive design

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- RESTful API architecture

## Installation

1. Clone the repository
```bash
git clone https://github.com/sukanta-chowdhury/Student-Job-Tracker.git
cd Student-Job-Tracker
```

2. Install dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
```

3. Configure environment variables
```bash
# Create a .env file in the root directory
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Add dummy database data
```bash
# Load demo user and sample job applications into MongoDB
npm run seed

# Demo login
# Email: demo.student@example.com
# Password: password123

# Optional: remove only the dummy user and their jobs
npm run seed:clear
```

5. Run the application
```bash
# Run both server and client concurrently
npm run dev

# Run server only
npm run server

# Run client only
npm run client
```

## API Endpoints

### Authentication
- `POST /api/users` - Register a new user
- `POST /api/auth` - Authenticate user & get token
- `GET /api/auth` - Get logged in user data

### Job Management
- `GET /api/jobs` - Get all jobs for a user
- `GET /api/jobs/:id` - Get specific job details
- `POST /api/jobs` - Create a new job entry
- `PUT /api/jobs/:id` - Update job information
- `DELETE /api/jobs/:id` - Delete a job entry

## License

This project is licensed under the MIT License

## Author

Sukanta Chowdhury

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
