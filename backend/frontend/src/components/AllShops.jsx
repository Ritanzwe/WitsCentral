import { Link } from "react-router-dom";

const shops = [
  {
    id: 1,
    image: 'https://placehold.jp/150x150.png',
    name: 'Spaza Shop 1',
    location: 'Johannesburg',
    description: 'A great shop with a variety of snacks, beverages, and more for the community.',
  },
  {
    id: 2,
    image: 'https://placehold.jp/150x150.png',
    name: 'Spaza Shop 2',
    location: 'Cape Town',
    description: 'We offer fresh produce, daily essentials, and friendly service for everyone.',
  },
  {
    id: 3,
    image: 'https://placehold.jp/150x150.png',
    name: 'Spaza Shop 3',
    location: 'Durban',
    description: 'Your one-stop shop for groceries, stationery, and all your everyday needs.',
  },
  {
    id: 4,
    image: 'https://placehold.jp/150x150.png',
    name: 'Spaza Shop 4',
    location: 'Pretoria',
    description: 'A great shop with everything you need, from groceries to household items.',
  },
];

const AllShops = () => {
  return (
    <div className="container mt-3">
      <h2 className="mb-4">Student Spaza</h2>
      <div className="row">
        {shops.map((shop) => (
          <Link to={`/shop/${shop.id}`} style={{cursor:"pointer",textDecoration:"none"}} key={shop.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card shadow-sm">
              <img
                src={shop.image}
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
