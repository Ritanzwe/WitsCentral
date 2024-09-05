// src/components/ServiceManager.js
import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

const AddServices = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState('');
    const [editingService, setEditingService] = useState(null);
    const [serviceToDelete, setServiceToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            setServices(data);
        } catch (err) {
            toast.error('Failed to fetch services');
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ service: newService }),
            });
            const data = await response.json();
            setServices([...services, data]);
            setNewService('');
            toast.success('Service added successfully!');
        } catch (err) {
            toast.error('Failed to add service');
        }
    };

    const handleUpdateService = async () => {
        try {
            if (!editingService || !editingService._id) {
                toast.error('No service selected for editing');
                return;
            }
    
            const response = await fetch(`/api/services/${editingService._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ service: editingService.service }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Failed to update service: ${errorData.error || 'Unknown error'}`);
                return;
            }
    
            const data = await response.json();
            setServices(services.map(srv => srv._id === data._id ? data : srv));
            setShowEditModal(false);
            toast.success('Service updated successfully!');
        } catch (err) {
            toast.error(`Failed to update service: ${err.message}`);
            console.error('Update service error:', err); // Log error on client
        }
    };

    const handleDeleteService = async () => {
        try {
            await fetch(`/api/services/${serviceToDelete._id}`, {
                method: 'DELETE',
            });
            setServices(services.filter(srv => srv._id !== serviceToDelete._id));
            setShowDeleteModal(false);
            toast.success('Service deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete service');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Manage Services</h2>
            <Form onSubmit={handleCreateService} className="mb-4">
                <Form.Group controlId="formService">
                    <Form.Label>New Service</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter service name"
                        value={newService}
                        onChange={(e) => setNewService(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Service
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service._id}>
                            <td>{service.service}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        setEditingService(service);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="ml-2"
                                    onClick={() => {
                                        setServiceToDelete(service);
                                        setShowDeleteModal(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formEditService">
                        <Form.Label>Service Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editingService?.service || ''}
                            onChange={(e) => setEditingService({ ...editingService, service: e.target.value })}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateService}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this service?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteService}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AddServices;
