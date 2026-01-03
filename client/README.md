# Contact Management Web App - Client

This is the frontend React application for the Contact Management System.

## Tech Stack
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with responsive design

## Features
- ✅ Contact form with validation (Name, Email, Phone, Message)
- ✅ Real-time form validation with error messages
- ✅ Submit button disabled when form is invalid
- ✅ Display contacts in a responsive table
- ✅ Delete contacts
- ✅ Sort contacts by date (newest/oldest first)
- ✅ Success messages on actions
- ✅ Fully responsive design
- ✅ No page reload (SPA)

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- pnpm package manager

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Start the development server:
```bash
pnpm dev
```

The client will run on `http://localhost:3000`

## API Integration

The client is configured to proxy API requests to the backend server running on `http://localhost:5000`.

API endpoints used:
- `GET /api/contacts` - Fetch all contacts
- `POST /api/contacts` - Create a new contact
- `DELETE /api/contacts/:id` - Delete a contact

## Form Validation

### Client-side Validation Rules:
- **Name**: Required, cannot be empty
- **Email**: Required, must be a valid email format
- **Phone**: Required, minimum 10 digits
- **Message**: Optional

Validation happens:
- On blur (when user leaves the field)
- On submit
- Real-time after first interaction

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx    # Form component with validation
│   │   └── ContactList.jsx    # List/table component with delete & sort
│   ├── App.jsx                # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html                # HTML template
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies and scripts
```

## Components

### ContactForm
Reusable form component with:
- State management for form data
- Field-level validation
- Error display
- Disabled submit button when invalid

### ContactList
Display component with:
- Responsive table layout
- Empty state message
- Delete functionality
- Sort by date feature

## Styling
- Custom CSS with gradient backgrounds
- Responsive design (mobile-friendly)
- Card-based layout
- Smooth transitions and hover effects
- Form validation visual feedback

## Build for Production

```bash
pnpm build
```

Build output will be in the `dist/` folder.

## Preview Production Build

```bash
pnpm preview
```
