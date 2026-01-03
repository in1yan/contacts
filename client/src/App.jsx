import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { getAllContacts, deleteContact } from "./services/api";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Fetch all contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllContacts();
      setContacts(data);
    } catch (err) {
      setError("Failed to fetch contacts. Please try again.");
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle new contact submission
  const handleContactAdded = (newContact) => {
    setContacts([newContact, ...contacts]);
    setSuccessMessage("Contact added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle contact deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) {
      return;
    }

    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact._id !== id));
      setSuccessMessage("Contact deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete contact. Please try again.");
      console.error("Error deleting contact:", err);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📇 Contact Management System</h1>
        <p>Manage your contacts easily</p>
      </header>

      <main className="app-main">
        {/* Success Message */}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {/* Error Message */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Contact Form */}
        <section className="form-section">
          <h2>Add New Contact</h2>
          <ContactForm onContactAdded={handleContactAdded} />
        </section>

        {/* Contact List */}
        <section className="list-section">
          <h2>Contact List ({contacts.length})</h2>
          {loading ? (
            <div className="loading">Loading contacts...</div>
          ) : contacts.length === 0 ? (
            <div className="empty-state">
              <p>No contacts yet. Add your first contact above!</p>
            </div>
          ) : (
            <ContactList contacts={contacts} onDelete={handleDelete} />
          )}
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React, Node.js, Express & MongoDB</p>
      </footer>
    </div>
  );
}

export default App;
