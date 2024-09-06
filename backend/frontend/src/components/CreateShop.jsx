import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CreateShop = () => {
  const [shopData, setShopData] = useState({
    name: '',
    location: '',
    description: '',
    contactInfo: '',
    image: null, // Added for image upload
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopData({ ...shopData, [name]: value });
  };

  const handleImageChange = (e) => {
    setShopData({ ...shopData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(shopData).forEach(key => {
      if (shopData[key]) {
        formData.append(key, shopData[key]);
      }
    });

    try {
      const response = await fetch('/api/shops', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/shop/${data.shop._id}`);
      } else {
        toast.error('Error creating shop');
      }
    } catch (error) {
      console.error('Error creating shop:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h2>Create Your Shop</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Shop Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={shopData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            name="location"
            value={shopData.location}
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
            value={shopData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contactInfo" className="form-label">Contact Info</label>
          <input
            type="text"
            className="form-control"
            id="contactInfo"
            name="contactInfo"
            value={shopData.contactInfo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Shop Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {shopData.image && (
            <img
              src={URL.createObjectURL(shopData.image)}
              alt="Image Preview"
              style={{ marginTop: '10px', maxWidth: '200px', maxHeight: '200px' }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-primary">Create Shop</button>
      </form>
    </div>
  );
};

export default CreateShop;
