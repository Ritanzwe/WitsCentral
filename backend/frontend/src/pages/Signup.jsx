import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import img from "../assets/people.png";
import { useState } from 'react';
import { useSignup } from '../hooks/useSignUp';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const { signup } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formValues);
        } catch (error) {
            console.error("Signup failed", error)
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f5f5f5' }}>
            <Row className="shadow-lg p-5 bg-white rounded">
                {/* Left Side - Form */}
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <h1 className="text-center mb-4">Hello</h1>
                    <p className="text-center mb-4">We are glad to see you with us</p>
                    
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFullName" className="mb-3">
                            <Form.Control
                                name="fullname"
                                value={formValues.fullname}
                                onChange={handleChange}
                                type="text"
                                placeholder="Full Name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Control
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Control
                                name="password"
                                value={formValues.password}
                                onChange={handleChange}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mb-4">
                            <Form.Control
                                name="confirmPassword"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                                type="password"
                                placeholder="Confirm Password"
                            />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="w-100 mb-3">
                            Next
                        </Button>
                    </Form>

                    <p className="text-center">or</p>

                    <Button variant="outline-secondary" className="w-100 mb-2">
                        <i className="bi bi-google"></i> Sign Up with Google
                    </Button>
                    <Button variant="outline-secondary" className="w-100">
                        <i className="bi bi-facebook"></i> Sign Up with Facebook
                    </Button>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login">Login</Link>
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

export default SignUp;
