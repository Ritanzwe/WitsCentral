import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of shops from the API
    fetch('/api/shops')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setShops(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="container mt-3"><p>Loading...</p></div>;
  if (error) return <div className="container mt-3"><p>Error loading shops: {error.message}</p></div>;

  function cha(image) {
    const ll = `${image}`.split("/")[2];
    return ll;
  }
  return (
    <div className="container mt-3">
      <h2 className="mb-4">Student Spaza</h2>
      <div className="row">
        {shops.map((shop) => (
          <Link to={`/shop/${shop._id}`} style={{cursor:"pointer",textDecoration:"none"}} key={shop._id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card shadow-sm">
              <img
                src={shop.image ? `http://localhost:5000/uploads/${cha(shop.image)}` : ''}
                className="card-img-top"
                alt={shop.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                <h5 className="card-title text-primary">
                  {shop.name}
                </h5>
                <p className="card-text text-muted">{shop.location}</p>
                <p className="card-text" style={{ maxHeight: '60px' }}>
                  {shop.description.length > 65
                    ? shop.description.slice(0, 65) + '...'
                    : shop.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllShops;
