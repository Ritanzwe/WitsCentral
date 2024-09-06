import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin'; 
import { Link } from 'react-router-dom';
import img from "../assets/people.png";

const Login = () => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const { login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formValues);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f5f5f5' }}>
            <Row className="shadow-lg p-5 bg-white rounded">
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h1 className="text-center mb-4">Welcome Back</h1>
                    <p className="text-center mb-4">Please log in to your account</p>
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Control
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-4">
                            <Form.Control
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="w-100 mb-3">
                            Log In
                        </Button>
                        
                    </Form>

                    <p className="text-center">or</p>

                    <Button variant="outline-secondary" className="w-100 mb-2">
                        <i className="bi bi-google"></i> Log In with Google
                    </Button>
                    <Button variant="outline-secondary" className="w-100">
                        <i className="bi bi-facebook"></i> Log In with Facebook
                    </Button>

                    <p className="text-center mt-3">
                        {"Don't"} have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                </Col>

                <Col md={6} className="d-none d-md-block d-flex justify-content-center align-items-center">
                    <img
                        src={img} 
                        alt="Login Visual"
                        className="img-fluid rounded"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
