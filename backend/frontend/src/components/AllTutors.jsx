import { Link } from "react-router-dom";

const tutors = [
  {
    id: 1,
    image: 'https://placehold.jp/150x150.png',
    fullName: 'John Doe',
    description: 'An experienced tutor in Mathematics with over 10 years of teaching experience. Specializes in algebra, calculus, and geometry.',
    subjects: ['Mathematics'],
    availability: 'Free',
  },
  {
    id: 2,
    image: 'https://placehold.jp/150x150.png',
    fullName: 'Jane Smith',
    description: 'Physics tutor who makes complex concepts easy to understand. Expert in mechanics, electromagnetism, and quantum physics.',
    subjects: ['Physics'],
    availability: 'Paid',
  },
  {
    id: 3,
    image: 'https://placehold.jp/150x150.png',
    fullName: 'Robert Brown',
    description: 'Science tutor with a passion for teaching all three branches of science. Experience in biology, chemistry, and earth sciences.',
    subjects: ['Science'],
    availability: 'Both',
  },
  {
    id: 4,
    image: 'https://placehold.jp/150x150.png',
    fullName: 'Emily Johnson',
    description: 'Versatile tutor in Mathematics and Science with a knack for interactive and engaging lessons. Skilled in various educational techniques.',
    subjects: ['Mathematics', 'Science'],
    availability: 'Free',
  },
];

const AllTutors = () => {
  return (
    <div className="container mt-3">
      <h2 className="mb-4">Available Tutors</h2>
      <div className="row">
        {tutors.map((tutor) => (
          <Link to={`/tutor/${tutor.id}`} style={{ cursor: "pointer", textDecoration: "none" }} key={tutor.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
            <div className="card shadow-sm">
              <img
                src={tutor.image}
                className="card-img-top"
                alt={tutor.fullName}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
                <h5 className="card-title text-primary">
                  {tutor.fullName}
                </h5>
                <p className="card-text text-muted">
                  {tutor.subjects.join(', ')}
                </p>
                <p className="card-text" style={{ maxHeight: '60px', overflow: 'hidden' }}>
                  {tutor.description.length > 65
                    ? tutor.description.slice(0, 65) + '...'
                    : tutor.description}
                </p>
                <p className="card-text">
                  <strong>Availability:</strong> {tutor.availability}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllTutors;
