// src/components/CategoryManager.js
import { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';

const AddCategories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            toast.error('Failed to fetch categories');
        }
    };

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: newCategory }),
            });
            const data = await response.json();
            console.log(data);
            setCategories([...categories, data]);
            setNewCategory('');
            toast.success('Category added successfully!');
        } catch (err) {
            toast.error('Failed to add category');
        }
    };

    const handleUpdateCategory = async () => {
        try {
            if (!editingCategory || !editingCategory._id) {
                toast.error('No category selected for editing');
                return;
            }
    
            const response = await fetch(`/api/categories/${editingCategory._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category: editingCategory.category }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                toast.error(`Failed to update category: ${errorData.error || 'Unknown error'}`);
                return;
            }
    
            const data = await response.json();
            setCategories(categories.map(cat => cat._id === data._id ? data : cat));
            setShowEditModal(false);
            toast.success('Category updated successfully!');
        } catch (err) {
            toast.error(`Failed to update category: ${err.message}`);
            console.error('Update category error:', err); // Log error on client
        }
    };

    const handleDeleteCategory = async () => {
        try {
            await fetch(`/api/categories/${categoryToDelete._id}`, {
                method: 'DELETE',
            });
            setCategories(categories.filter(cat => cat._id !== categoryToDelete._id));
            setShowDeleteModal(false);
            toast.success('Category deleted successfully!');
        } catch (err) {
            toast.error('Failed to delete category');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Manage Categories</h2>
            <Form onSubmit={handleCreateCategory} className="mb-4">
                <Form.Group controlId="formCategory">
                    <Form.Label>New Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter category name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Category
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
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.category}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        setEditingCategory(category);
                                        setShowEditModal(true);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    className="ml-2"
                                    onClick={() => {
                                        setCategoryToDelete(category);
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
                    <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formEditCategory">
                        <Form.Label>Category Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={editingCategory?.category || ''}
                            onChange={(e) => setEditingCategory({ ...editingCategory, category: e.target.value })}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateCategory}>
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
                    Are you sure you want to delete this category?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteCategory}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AddCategories;
