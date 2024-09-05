import React, { useState, useEffect } from 'react';

const categories = ['All', 'Music', 'Academic', 'Art', 'Sports', 'Technology'];

const EventDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch event data from backend API
    fetch('/api/events') // Replace with actual backend endpoint
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events
    .filter(event => selectedCategory === 'All' || event.category === selectedCategory)
    .filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div style={styles.dashboard}>
      <h1 style={styles.title}>Discover Campus Events</h1>
      
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            style={selectedCategory === category ? styles.activeNavButton : styles.navButton}
          >
            {category}
          </button>
        ))}
      </nav>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>

      {/* Events Section */}
      <div style={styles.eventsSection}>
        {filteredEvents.length > 0 ? (
          <div style={styles.gridContainer}>
            {filteredEvents.map(event => (
              <div key={event.id} style={styles.eventCard}>
                <img src={event.image} alt={event.title} style={styles.eventImage} />
                <div style={styles.eventDetails}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDate}>{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={styles.noEvents}>No events found for the selected category and search term.</p>
        )}
      </div>
    </div>
  );
};

// Styles (wide layout, responsive)
const styles = {
  dashboard: {
    padding: '50px',
    fontFamily: `'Poppins', sans-serif`,
    maxWidth: '1600px', // Adjusted for wide page layout
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease-in-out',
  },
  title: {
    textAlign: 'center',
    marginBottom: '40px',
    fontSize: '3em',
    color: '#333',
    letterSpacing: '1px',
    fontWeight: '600',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '14px 30px',
    border: 'none',
    backgroundColor: '#f0f0f0',
    color: '#333',
    cursor: 'pointer',
    borderRadius: '50px',
    fontSize: '1em',
    transition: 'background-color 0.4s, transform 0.2s',
  },
  activeNavButton: {
    padding: '14px 30px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '50px',
    fontSize: '1em',
    transform: 'scale(1.1)',
    transition: 'background-color 0.4s, transform 0.2s',
  },
  searchContainer: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  searchInput: {
    padding: '15px',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '25px',
    border: '2px solid #ddd',
    fontSize: '1em',
    outline: 'none',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
  },
  eventsSection: {
    marginTop: '40px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    cursor: 'pointer',
  },
  eventImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
  },
  eventDetails: {
    padding: '20px',
    textAlign: 'center',
  },
  eventTitle: {
    margin: '10px 0',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    margin: '0',
    color: '#777',
    fontSize: '1.1em',
  },
  noEvents: {
    textAlign: 'center',
    color: '#888',
    fontSize: '1.3em',
  },
};

export default EventDashboard;
