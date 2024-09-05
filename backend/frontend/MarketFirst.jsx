import React, { useState } from 'react';

const MarketFirst = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCategories, setVisibleCategories] = useState(5); // Number of initially visible categories

  // Dummy data for shops, categories, and recommended products
  const shops = ['Shop A', 'Shop B', 'Shop C', 'Shop D'];
  const categories = [
    { name: 'Electronics', img: 'https://via.placeholder.com/150' },
    { name: 'Clothing', img: 'https://via.placeholder.com/150' },
    { name: 'Food', img: 'https://via.placeholder.com/150' },
    { name: 'Services', img: 'https://via.placeholder.com/150' },
    { name: 'Books', img: 'https://via.placeholder.com/150' },
    { name: 'Health', img: 'https://via.placeholder.com/150' },
    { name: 'Accessories', img: 'https://via.placeholder.com/150' },
    { name: 'Groceries', img: 'https://via.placeholder.com/150' },
    { name: 'Home Decor', img: 'https://via.placeholder.com/150' },
    { name: 'Fitness', img: 'https://via.placeholder.com/150' },
    { name: 'Gaming', img: 'https://via.placeholder.com/150' },
    { name: 'Music', img: 'https://via.placeholder.com/150' },
    { name: 'Travel', img: 'https://via.placeholder.com/150' },
    { name: 'Education', img: 'https://via.placeholder.com/150' },
    { name: 'Furniture', img: 'https://via.placeholder.com/150' },
    { name: 'Beauty', img: 'https://via.placeholder.com/150' },
    { name: 'Sports', img: 'https://via.placeholder.com/150' },
    { name: 'Toys', img: 'https://via.placeholder.com/150' },
    { name: 'Pets', img: 'https://via.placeholder.com/150' },
    { name: 'Stationery', img: 'https://via.placeholder.com/150' },
  ];

  const recommendedProducts = [
    { name: 'Smartphone', img: 'https://via.placeholder.com/150', price: '$299' },
    { name: 'Laptop', img: 'https://via.placeholder.com/150', price: '$799' },
    { name: 'Headphones', img: 'https://via.placeholder.com/150', price: '$99' },
    { name: 'Sneakers', img: 'https://via.placeholder.com/150', price: '$120' },
    { name: 'Smartwatch', img: 'https://via.placeholder.com/150', price: '$199' },
    { name: 'Backpack', img: 'https://via.placeholder.com/150', price: '$79' },
    { name: 'Camera', img: 'https://via.placeholder.com/150', price: '$499' },
    { name: 'Bluetooth Speaker', img: 'https://via.placeholder.com/150', price: '$89' },
  ];

  // Sort categories alphabetically
  const sortedCategories = categories.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  // Show filtered shops based on search term
  const filteredShops = shops.filter(shop =>
    shop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Show more categories when "Load More" is clicked
  const loadMoreCategories = () => {
    setVisibleCategories(prev => prev + 5); // Increase visible categories by 5
  };

  return (
    <div style={styles.appContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.section}>
          <h3 style={styles.header}>All Shops</h3>
          <ul style={styles.list}>
            {filteredShops.map((shop, index) => (
              <li key={index} style={styles.listItem}>{shop}</li>
            ))}
          </ul>
        </div>

        <div style={styles.section}>
          <h3 style={styles.header}>Categories</h3>
          <ul style={styles.list}>
            {sortedCategories.slice(0, visibleCategories).map((category, index) => (
              <li key={index} style={styles.listItem}>{category.name}</li>
            ))}
          </ul>
          {visibleCategories < sortedCategories.length && (
            <button style={styles.loadMoreButton} onClick={loadMoreCategories}>
              Load More
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for shops..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Explore Popular Categories */}
        <div style={styles.exploreSection}>
          <h2>Explore Popular Categories</h2>
          <div style={styles.gridContainer}>
            {sortedCategories.slice(0, 12).map((category, index) => ( // Show 12 items, 3 rows, 4 columns
              <div key={index} style={styles.card}>
                <img src={category.img} alt={category.name} style={styles.cardImage} />
                <h3>{category.name}</h3>
                <p>Explore the best {category.name} deals!</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer Section */}
        <div style={styles.spacer}></div>

        {/* Recommended for You */}
        <div style={styles.recommendedSection}>
          <h2>Recommended for You</h2>
          <div style={styles.gridContainer}>
            {recommendedProducts.map((product, index) => ( // Show recommended products
              <div key={index} style={styles.card}>
                <img src={product.img} alt={product.name} style={styles.cardImage} />
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  appContainer: {
    display: 'flex',
  },
  sidebar: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '250px',
    backgroundColor: '#f4f4f4',
    padding: '20px',
    height: '100vh',
    overflowY: 'auto',
  },
  section: {
    marginBottom: '30px',
  },
  header: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  listItem: {
    marginBottom: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  listItemHover: {
    backgroundColor: '#ddd',
    transform: 'scale(1.05)',
  },
  mainContent: {
    marginLeft: '270px',
    flex: 1,
    padding: '20px',
  },
  searchBar: {
    position: 'fixed',
    top: '20px',
    left: '270px',
    width: 'calc(100% - 290px)',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
    zIndex: '1', // Ensure it's on top of other content
  },
  input: {
    width: '100%',
    maxWidth: '400px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  exploreSection: {
    marginTop: '80px', // Space for the fixed search bar
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 cards per row
    gap: '20px',
  },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
  },
  cardImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '15px',
    borderRadius: '8px',
  },
  loadMoreButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  spacer: {
    height: '40px', // Space below the cards
  },
  recommendedSection: {
    marginTop: '40px',
  },
};

export default MarketFirst;
