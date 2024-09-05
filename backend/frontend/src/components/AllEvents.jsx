import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    image: 'https://placehold.jp/150x150.png',
    name: 'Community Workshop',
    date: '2024-10-15',
    location: 'Johannesburg Community Center',
    description: 'Join us for an engaging workshop on community building and leadership. Various activities and discussions will be held throughout the day.',
    availability: 'Free',
  },
  {
    id: 2,
    image: 'https://placehold.jp/150x150.png',
    name: 'Tech Innovations Conference',
    date: '2024-11-20',
    location: 'Cape Town Convention Center',
    description: 'A conference showcasing the latest in tech innovations. Hear from industry leaders and participate in tech demonstrations.',
    availability: 'Paid',
  },
  {
    id: 3,
    image: 'https://placehold.jp/150x150.png',
    name: 'Music Festival',
    date: '2024-12-05',
    location: 'Durban Sports Arena',
    description: 'Enjoy a day of live music from various genres at the annual Music Festival. Featuring performances from popular bands and artists.',
    availability: 'Both',
  },
  {
    id: 4,
    image: 'https://placehold.jp/150x150.png',
    name: 'Art Exhibition',
    date: '2024-09-10',
    location: 'Pretoria Art Gallery',
    description: 'Explore a curated collection of contemporary art from local artists. An evening of culture and creativity awaits.',
    availability: 'Free',
  },
];

const AllEvents = () => {
  return (
    <div className="container mt-3">
      <h2 className="mb-4">Upcoming Events</h2>
      <div className="row">
        {events.map((event) => (
          <Link to={`/event/${event.id}`} style={{ cursor: "pointer", textDecoration: "none" }} key={event.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card shadow-sm">
              <img
                src={event.image}
                className="card-img-top"
                alt={event.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                <h5 className="card-title text-primary">
                  {event.name}
                </h5>
                <p className="card-text text-muted">
                  {event.date} | {event.location}
                </p>
                <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                  {event.description.length > 65
                    ? event.description.slice(0, 65) + '...'
                    : event.description}
                </p>
                <p className="card-text">
                  <strong>Availability:</strong> {event.availability}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;