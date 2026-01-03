import { useState } from "react";
import { createContact } from "../services/api";

const ContactForm = ({ onContactAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) {
      return "Phone number is required";
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return "Please enter a valid phone number";
    }
    return "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};

    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newContact = await createContact(formData);
      onContactAdded(newContact);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
    } catch (error) {
      setErrors({
        submit: error.message || "Failed to create contact. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      !validateName(formData.name) &&
      !validateEmail(formData.email) &&
      !validatePhone(formData.phone)
    );
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="name">
          Name <span className="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? "error" : ""}
          placeholder="Enter full name"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      {/* Email Field */}
      <div className="form-group">
        <label htmlFor="email">
          Email <span className="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error" : ""}
          placeholder="example@email.com"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      {/* Phone Field */}
      <div className="form-group">
        <label htmlFor="phone">
          Phone <span className="required">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? "error" : ""}
          placeholder="+1 (234) 567-8900"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      {/* Message Field */}
      <div className="form-group">
        <label htmlFor="message">Message (Optional)</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message here..."
          rows="4"
        />
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <div className="error-message submit-error">{errors.submit}</div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!isFormValid() || isSubmitting}
      >
        {isSubmitting ? "Adding Contact..." : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
