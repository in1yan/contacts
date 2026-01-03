const API_BASE_URL = "/api";

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data;
};

// Create a new contact
export const createContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating contact:", error);
    throw error;
  }
};

// Get all contacts
export const getAllContacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch contacts");
    }

    return data.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Get a single contact by ID
export const getContactById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

// Update a contact
export const updateContact = async (id, contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete contact");
    }

    return data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};
