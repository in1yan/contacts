import { useState } from "react";

const ContactList = ({ contacts, onDelete }) => {
  const [sortBy, setSortBy] = useState("newest");

  // Sort contacts based on selected option
  const getSortedContacts = () => {
    const sorted = [...contacts];
    switch (sortBy) {
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  };

  const sortedContacts = getSortedContacts();

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="contact-list">
      {/* Sort Controls */}
      <div className="list-controls">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      {/* Contact Cards */}
      <div className="contacts-grid">
        {sortedContacts.map((contact) => (
          <div key={contact._id} className="contact-card">
            <div className="contact-header">
              <div className="contact-avatar">
                {contact.name.charAt(0).toUpperCase()}
              </div>
              <div className="contact-info">
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-date">{formatDate(contact.createdAt)}</p>
              </div>
            </div>

            <div className="contact-details">
              <div className="contact-detail-item">
                <span className="detail-icon">📧</span>
                <a href={`mailto:${contact.email}`} className="detail-text">
                  {contact.email}
                </a>
              </div>

              <div className="contact-detail-item">
                <span className="detail-icon">📱</span>
                <a href={`tel:${contact.phone}`} className="detail-text">
                  {contact.phone}
                </a>
              </div>

              {contact.message && (
                <div className="contact-detail-item">
                  <span className="detail-icon">💬</span>
                  <p className="detail-text message">{contact.message}</p>
                </div>
              )}
            </div>

            <div className="contact-actions">
              <button
                onClick={() => onDelete(contact._id)}
                className="btn btn-delete"
                title="Delete contact"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
