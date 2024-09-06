// src/pages/AdminDashboard.jsx

import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container className="mt-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row className="g-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Events</Card.Title>
              <Card.Text>
                View events on the platform.
              </Card.Text>
              <Link to="/events">
                <Button variant="primary">Go to Events</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Management of Events</Card.Title>
              <Card.Text>
                edit, or create new events for the platform.
              </Card.Text>
              <Link to="/event-create">
                <Button variant="primary">Manage</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Shops</Card.Title>
              <Card.Text>
                Oversee all shops, including adding new ones or managing existing ones.
              </Card.Text>
              <Link to="/shopownerprofile">
                <Button variant="primary">Go to Shops</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Categories</Card.Title>
              <Card.Text>
                Add or edit categories for services, products, and more.
              </Card.Text>
              <Link to="/addcategories">
                <Button variant="primary">Go to Categories</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Services</Card.Title>
              <Card.Text>
                Manage different services offered on the platform.
              </Card.Text>
              <Link to="/addservices">
                <Button variant="primary">Go to Services</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Manage Books</Card.Title>
              <Card.Text>
                Handle the book listings available on the platform.
              </Card.Text>
              <Link to="/service/books">
                <Button variant="primary">Go to Books</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Forum Management</Card.Title>
              <Card.Text>
                Oversee discussions and posts within the forum.
              </Card.Text>
              <Link to="/service/forum">
                <Button variant="primary">Go to Forum</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
