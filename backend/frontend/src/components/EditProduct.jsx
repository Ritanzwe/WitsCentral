import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details
    fetch(`/api/products/${productId}`)
      .then(response => response.json())
      .then(data => setProductData(data))
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the product (PUT request)
    fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate(`/shop/${data.product.shop}`); // Redirect to the shop's page after editing
        }
      })
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <div className="container mt-3">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
