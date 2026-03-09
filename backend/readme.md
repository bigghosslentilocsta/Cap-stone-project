# Blog Application Backend

A multi-role blogging platform backend built with Node.js, Express, and MongoDB, supporting three user roles: Users, Authors, and Admins.

## Features

### User Roles

**Users**
- Register and authenticate
- Browse and read articles
- Comment on articles

**Authors**
- Register and authenticate as content creators
- Create, edit, and publish articles
- View their own articles
- Soft delete articles (marking as inactive)

**Admins**
- Authenticate with admin privileges
- View all articles across the platform
- Block or unblock authors
- Moderate content

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Environment Management**: dotenv

## API Routes

### User Routes (`/users`)
- User registration
- User authentication
- Read articles
- Comment on articles

### Author Routes (`/authors`)
- Author registration
- Author authentication
- Create new articles
- Read author's articles
- Edit articles
- Delete articles (soft delete)

### Admin Routes (`/admins`)
- Admin authentication
- Read all articles
- Block/unblock authors

## Database Schema

### User Schema
- firstName (String, required)
- lastName (String, optional)
- email (String, required)
- profileImage (String, optional)
- role (Enum: admin, user, author)
- isActive (Boolean, default: true)
- password (String, required)
- Timestamps: createdAt, updatedAt

### Article Schema
- author (ObjectId ref User, required)
- title (String, required)
- category (String, required)
- content (String, required)
- comments (Array of user comments)
- isArticleActive (Boolean, default: true)
- Timestamps: createdAt, updatedAt

### Comment Schema
- user (ObjectId ref User)
- comment (String)

## Setup

1. Install dependencies: `npm install`
2. Create `.env` file with:
   ```
   DB_URL=your_mongodb_connection_string
   PORT=your_port_number
   ```
3. Start server: `node server.js`

## Development Process

1. Initialize git repository: `git init`
2. Add .gitignore file
3. Create .env file for environment variables
4. Generate package.json: `npm init -y`
5. Create Express app
6. Connect to MongoDB
7. Add middlewares (body parser, error handling)
8. Design schemas and create models
9. Design REST APIs for all resources

## working architecture of blog app

![alt text](<WhatsApp Image 2026-02-10 at 9.28.43 AM.jpeg>)

