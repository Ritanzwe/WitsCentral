import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const ShopDetails = () => {
  const { id } = useParams(); // Get shop ID from URL
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the shop's details from the backend
    fetch(`/api/shops/${id}`)
      .then(response => response.json())
      .then(data => setShop(data))
      .catch(error => console.error('Error fetching shop details:', error));
  }, [id]);

  // Function to navigate to the add product page
  const handleAddProduct = () => {
    navigate(`/shop/${id}/product/new`);
  };

  // Function to handle deleting a product
  const handleDeleteProduct = (productId) => {
    fetch(`/api/shops/${id}/products/${productId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Remove the deleted product from the local state
          setShop(prevShop => ({
            ...prevShop,
            products: prevShop.products.filter(product => product._id !== productId)
          }));
        } else {
          console.error('Error deleting product:', data.error);
        }
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  // Function to handle deleting the shop
  const handleDeleteShop = () => {
    fetch(`/api/shops/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate('/service/student-market');
        } else {
          console.error('Error deleting shop:', data.error);
        }
      })
      .catch(error => console.error('Error deleting shop:', error));
  };

  if (!shop) return <div className="container mt-3"><p>Loading...</p></div>;

  function cha(image) {
    console.log(image);
    const ll = `${image}`.split("/")[2];
    return ll;
  }

  return (
    <>
      <NavBar/>
      
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-4">
          <img
            src={shop.image ? `http://localhost:5000/uploads/${cha(shop.image)}` : ''}
            alt={shop.name}
            className="img-fluid rounded mb-3"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-8">
          <h2 className="text-primary">{shop.name}</h2>
          <p><strong>Location:</strong> {shop.location}</p>
          <p><strong>Description:</strong> {shop.description}</p>
          <p><strong>Contact:</strong> {shop.contactInfo}</p>
          <button className="btn btn-primary mt-3" onClick={handleAddProduct}>
            Add Product
          </button>
          <button className="btn btn-danger mt-3" onClick={handleDeleteShop}>
            Delete Shop
          </button>
        </div>
      </div>

      <h3 className="mt-4">Products</h3>
      <div className="row">
        {shop.products.map(product => (
          <div key={product._id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card shadow-sm">
              <img
                src={product.image ? `http://localhost:5000/uploads/${cha(product.image)}` : 'https://placehold.jp/150x150.png'}
                className="card-img-top"
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text text-muted">${product.price.toFixed(2)}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ShopDetails;
