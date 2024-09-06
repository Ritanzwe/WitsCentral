import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Link, useNavigate } from 'react-router-dom';

const ShopDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [shops, setShops] = useState([]);

  useEffect(() => {
    fetch('/api/shops')
      .then(response => response.json())
      .then(data => setShops(data))
      .catch(error => console.error('Error fetching shops:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter shops based on their description (bio) or name
  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBecomeShopOwner = () => {
    navigate('/shopownerprofile');
  };

  function cha(image) {
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <>
      <NavBar />

      {/* Become a Shop Owner Section */}
      <div style={styles.becomeShopOwnerSection}>
        <h2 style={styles.sectionTitle}>Interested in Becoming a Shop Owner?</h2>
        <button onClick={handleBecomeShopOwner} style={styles.becomeShopOwnerButton}>
          Become a Shop Owner
        </button>
      </div>

      <div style={styles.dashboard}>
        {/* Find a Perfect Shop Box */}
        <div style={styles.shopBox}>
          <h2 style={styles.shopText}>Find a perfect shop</h2>
          <input
            type="text"
            placeholder="Search for shops..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={styles.searchInput}
          />
        </div>

        {/* All Shops Section */}
        <div style={styles.shopsSection}>
          <h2 style={styles.sectionTitle}>All Shops</h2>
          <div className="row">
            {filteredShops.length > 0 ? (
              filteredShops.map(shop => (
                <Link
                  to={`/shop/${shop._id}`}
                  key={shop._id}
                  className="col-md-6 col-lg-4 col-xl-3 mb-4"
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  <div className="card shadow-sm">
                    <img
                      src={shop.image ? `http://localhost:5000/uploads/${cha(shop.image)}` : ''}
                      className="card-img-top"
                      alt={shop.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                      <h5 className="card-title text-primary">
                        {shop.name}
                      </h5>
                      <p className="card-text text-muted">
                        {shop.location}
                      </p>
                      <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                        {shop.description.length > 40
                          ? shop.description.slice(0, 40) + '...'
                          : shop.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p style={styles.noShopsMessage}>No shops found for {`${searchTerm}`}.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Styles
const styles = {
  dashboard: {
    padding: '50px',
    fontFamily: `'Poppins', sans-serif`,
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#f7f9fc',
  },
  shopBox: {
    backgroundColor: '#f1f1f1',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
    textAlign: 'center',
  },
  shopText: {
    fontSize: '2em',
    marginBottom: '15px',
  },
  searchInput: {
    width: '100%',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '1.2em',
    outline: 'none',
  },
  becomeShopOwnerSection: {
    marginBottom: '25px',
    marginTop: '25px',
    textAlign: 'center',
  },
  becomeShopOwnerButton: {
    padding: '15px 30px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  shopsSection: {
    marginTop: '40px',
  },
  noShopsMessage: {
    fontSize: '1.4em',
    color: '#999',
    textAlign: 'center',
    marginTop: '20px',
  },
};

export default ShopDashboard;
