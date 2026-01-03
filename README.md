# Contact Management Web App

A full-stack MERN (MongoDB, Express, React, Node.js) contact management application built as an interview task demonstration.

## 📋 Features

- ✅ Add new contacts with validation
- ✅ View all contacts in a responsive grid layout
- ✅ Delete contacts with confirmation
- ✅ Sort contacts (Newest, Oldest, Name A-Z)
- ✅ Real-time form validation
- ✅ Client-side and server-side validation
- ✅ Responsive design for all devices
- ✅ Success/Error notifications
- ✅ Clean and modern UI

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Custom styling with modern design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Package Manager
- **pnpm** - Fast, disk space efficient package manager

## 📁 Project Structure

```
contacts/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ContactForm.jsx
│   │   │   └── ContactList.jsx
│   │   ├── services/       # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx         # Main app component
│   │   ├── App.css         # App-specific styles
│   │   ├── index.css       # Global styles
│   │   └── main.jsx        # App entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── server/                 # Node.js backend
    ├── src/
    │   ├── config/         # Configuration files
    │   │   └── database.js
    │   ├── controllers/    # Request handlers
    │   │   └── contactController.js
    │   ├── models/         # Mongoose models
    │   │   └── Contact.js
    │   ├── routes/         # API routes
    │   │   └── contactRoutes.js
    │   ├── app.js          # Express app setup
    │   └── server.js       # Server entry point
    ├── .env                # Environment variables
    ├── .env.example        # Environment template
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- pnpm (or npm/yarn)

### Installation

1. **Clone the repository**
   ```bash
   cd contacts
   ```

2. **Install pnpm (if not already installed)**
   ```bash
   npm install -g pnpm
   ```

3. **Set up the Backend**
   ```bash
   cd server
   pnpm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/contacts
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   ```

   For MongoDB Atlas:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contacts
   PORT=5000
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Set up the Frontend**
   ```bash
   cd ../client
   pnpm install
   ```

## 🏃 Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd server
   pnpm dev
   ```
   Server will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd client
   pnpm dev
   ```
   Client will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 📡 API Endpoints

### Contacts

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/contacts`     | Get all contacts     |
| GET    | `/api/contacts/:id` | Get contact by ID    |
| POST   | `/api/contacts`     | Create new contact   |
| PUT    | `/api/contacts/:id` | Update contact       |
| DELETE | `/api/contacts/:id` | Delete contact       |

### Request/Response Examples

**POST /api/contacts**
```json
// Request Body
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (234) 567-8900",
  "message": "Hello!"
}

// Response
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "_id": "60d5ec49f1b2c8b1f8c4e1a1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (234) 567-8900",
    "message": "Hello!",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**GET /api/contacts**
```json
{
  "success": true,
  "count": 2,
  "total": 2,
  "data": [...]
}
```

## 🎨 Features in Detail

### Form Validation
- **Client-side**: Real-time validation as user types
- **Server-side**: Additional validation on the backend
- **Required fields**: Name, Email, Phone
- **Email validation**: Regex pattern matching
- **Phone validation**: Accepts various formats
- **Disabled submit**: Button disabled until form is valid

### Contact Display
- **Card-based layout**: Modern, responsive cards
- **Avatar initials**: Colored circles with first letter
- **Sorting options**: By newest, oldest, or name
- **Responsive grid**: Adapts to screen size
- **Delete confirmation**: Prevents accidental deletion

### User Experience
- **Success messages**: Confirmation on add/delete
- **Error handling**: Clear error messages
- **Loading states**: Feedback during API calls
- **Empty state**: Helpful message when no contacts
- **Smooth animations**: Fade-in effects and transitions

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🔒 Validation Rules

### Name
- Required
- Minimum 2 characters
- Maximum 100 characters

### Email
- Required
- Valid email format
- Unique (enforced in database)

### Phone
- Required
- Accepts numbers, spaces, dashes, parentheses, plus sign
- Example formats: `+1-234-567-8900`, `(234) 567-8900`

### Message
- Optional
- Maximum 500 characters

## 🧪 Testing

You can test the API endpoints using:
- Browser (for GET requests)
- Postman
- cURL
- Thunder Client (VS Code extension)

Example cURL:
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"1234567890"}'
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or check your Atlas connection string
- Verify the `MONGODB_URI` in `.env` file
- Check if your IP is whitelisted in MongoDB Atlas

### Port Already in Use
```bash
# Change PORT in server/.env file
PORT=5001

# Update CORS_ORIGIN accordingly
CORS_ORIGIN=http://localhost:3000
```

### Module Not Found Errors
```bash
# Reinstall dependencies
cd server
pnpm install

cd ../client
pnpm install
```

## 🎯 Future Enhancements

- [ ] Edit contact functionality
- [ ] Search and filter contacts
- [ ] Pagination for large datasets
- [ ] Export contacts to CSV
- [ ] Contact categories/tags
- [ ] Bulk operations
- [ ] User authentication
- [ ] Dark mode toggle
- [ ] Contact import from CSV

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a technical interview demonstration showcasing MERN stack proficiency.

## 🙏 Acknowledgments

- Built with React + Vite
- Icons from Unicode/Emoji
- Modern CSS design patterns
- RESTful API best practices

---

**Built with ❤️ using the MERN Stack**