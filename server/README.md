# Contact Management Backend API

A RESTful API backend for managing contacts built with Node.js, Express.js, and MongoDB.

## Features

- ✅ Create new contacts with validation
- ✅ Retrieve all contacts with optional sorting and pagination
- ✅ Get individual contact details
- ✅ Update existing contacts
- ✅ Delete contacts
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend integration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed locally OR MongoDB Atlas account
- pnpm package manager (or npm/yarn)

## Installation

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```
   Or with npm:
   ```bash
   npm install
   ```

3. **Create .env file:**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   
   Edit the `.env` file with your settings:
   ```env
   MONGODB_URI=mongodb://localhost:27017/contacts_db
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/contacts_db
   ```

## Running the Application

### Development Mode

```bash
pnpm dev
```

Or with npm:
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 1. Create Contact

```http
POST /api/contacts
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, I'd like to get in touch!"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Hello, I'd like to get in touch!",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Validation Rules:**
- `name`: Required, 2-100 characters
- `email`: Required, valid email format
- `phone`: Required, valid phone number format
- `message`: Optional, max 500 characters

### 2. Get All Contacts

```http
GET /api/contacts
```

**Query Parameters:**
- `sort` - Sort field (default: `-createdAt`)
  - Examples: `name`, `-name`, `createdAt`, `-createdAt`
- `limit` - Number of results per page (optional)
- `page` - Page number (default: 1)

**Examples:**
```http
GET /api/contacts
GET /api/contacts?sort=name
GET /api/contacts?sort=-createdAt&limit=10&page=1
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 10,
  "total": 25,
  "data": [
    {
      "_id": "65abc123...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "message": "Hello!",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### 3. Get Single Contact

```http
GET /api/contacts/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "message": "Hello!",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 4. Update Contact

```http
PUT /api/contacts/:id
```

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "phone": "+1234567899",
  "message": "Updated message"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "_id": "65abc123...",
    "name": "John Updated",
    "email": "john.updated@example.com",
    "phone": "+1234567899",
    "message": "Updated message",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:30:00.000Z"
  }
}
```

### 5. Delete Contact

```http
DELETE /api/contacts/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": {}
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Name, email, and phone are required fields"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Contact not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Server error. Please try again later."
}
```

## Database Schema

### Contact Model

```javascript
{
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: {
    type: String,
    required: true,
    match: /^[\d\s\-\+\(\)]+$/
  },
  message: {
    type: String,
    maxlength: 500,
    default: ""
  },
  timestamps: true  // Adds createdAt and updatedAt
}
```

## Project Structure

```
server/
├── src/
│   ├── config/
│   │   └── database.js       # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js  # Business logic
│   ├── models/
│   │   └── Contact.js        # Mongoose schema
│   ├── routes/
│   │   └── contactRoutes.js  # API routes
│   ├── app.js                # Express app setup
│   └── server.js             # Entry point
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── package.json
└── README.md
```

## Testing with cURL

### Create a contact:
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "Test message"
  }'
```

### Get all contacts:
```bash
curl http://localhost:5000/api/contacts
```

### Delete a contact:
```bash
curl -X DELETE http://localhost:5000/api/contacts/<contact_id>
```

## Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:5000/api`
3. Test each endpoint with the request bodies shown above

## Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `.env` file
- Check if port 27017 is available

### Port Already in Use
- Change the PORT in `.env` file
- Kill the process using port 5000: `lsof -ti:5000 | xargs kill` (Mac/Linux)

### CORS Issues
- Update `CORS_ORIGIN` in `.env` to match your frontend URL
- For development, you can use `*` (not recommended for production)

## Future Enhancements

- [ ] Add authentication and authorization
- [ ] Implement rate limiting
- [ ] Add search functionality
- [ ] Email validation with verification
- [ ] Add logging with Winston or Morgan
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] API documentation with Swagger/OpenAPI

## License

ISC

## Author

Your Name

---

**Happy Coding! 🚀**