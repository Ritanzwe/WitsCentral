import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const { id } = useParams(); // Get shop ID from the URL
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    image: null, // Change to handle file upload
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value} = e.target;
    setProductData({ ...productData, [name]: value });
  };
  const handleImageChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    if (productData.image) {
      formData.append('image', productData.image); // Append image file
    }

    // Send the product data to the server (POST request)
    fetch(`/api/shops/${id}/products`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          navigate(`/shop/${id}`); // Redirect to the shop's page after product creation
        }
      })
      .catch(error => console.error('Error creating product:', error));
  };

  return (
    <div className="container mt-3">
      <h2>Add New Product</h2>
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
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
