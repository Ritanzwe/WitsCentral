import React, { useState, useEffect } from 'react';

const AdminEventPage = () => {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    category: '',
    image: null,
    description: '',
    price: '',
  });

  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch categories from the API
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(eventData).forEach(key => {
      formData.append(key, eventData[key]);
    });

    // Send POST request to backend API
    fetch('/api/events', {
      method: 'POST',
      body: formData, // Sending form data to handle file uploads
    })
      .then(response => response.json())
      .then(data => {
        alert('Event posted successfully!');
        setEventData({ title: '', date: '', time: '', location: '', category: '', image: null, description: '', price: '' });
      })
      .catch(error => console.error('Error posting event:', error));
  };

  return (
    <div style={adminStyles.container}>
      <h1 style={adminStyles.title}>Post a New Event</h1>
      <form onSubmit={handleSubmit} style={adminStyles.form}>
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          style={adminStyles.input}
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          style={adminStyles.input}
        />
        <input
          type="time"
          name="time"
          value={eventData.time}
          onChange={handleChange}
          style={adminStyles.input}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={eventData.location}
          onChange={handleChange}
          style={adminStyles.input}
        />
        
        {/* Category Dropdown */}
        <select
          name="category"
          value={eventData.category}
          onChange={handleChange}
          style={adminStyles.input}
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          style={adminStyles.input}
        />

        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          style={adminStyles.textarea}
        />

        <input
          type="text"
          name="price"
          placeholder="Price or RSVP"
          value={eventData.price}
          onChange={handleChange}
          style={adminStyles.input}
        />

        <button type="submit" style={adminStyles.button}>Post Event</button>
      </form>
    </div>
  );
};

// Styles for Admin Page
const adminStyles = {
  container: {
    padding: '50px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    fontFamily: `'Poppins', sans-serif`,
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5em',
    marginBottom: '40px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #ddd',
    fontSize: '1em',
    outline: 'none',
  },
  textarea: {
    padding: '15px',
    borderRadius: '10px',
    border: '2px solid #ddd',
    fontSize: '1em',
    outline: 'none',
    height: '150px',
  },
  button: {
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1.2em',
    cursor: 'pointer',
    border: 'none',
  },
};

export default AdminEventPage;
