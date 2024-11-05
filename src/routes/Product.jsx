// ProductManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductForm from '../components/AddProductForm';
import EditProductForm from '../components/EditProduct';
import ProductList from '../components/ProductList';
import Dropdown from '../components/Dropdown';
import DeleteProduct from '../components/DeleteProductForm';
function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formMode, setFormMode] = useState('Add Product'); // 'add' or 'edit' mode

  

    const addProduct = (product) => {
        setProducts([...products, product]);
        setFormMode('add'); // Switch back to add mode after adding a product
    };

    const updateProduct = (updatedProduct) => {
        setProducts(products.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)));
        setEditingProduct(null);
        setFormMode('add'); // Switch back to add mode after editing
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${productId}`);
            setProducts(products.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setFormMode('edit');
    };

    const handleModeChange = (e) => {
        setFormMode(e);
    };

    return (
        <>
            <Dropdown
                options={['Add Product', 'Edit Product', 'Delete Product']}
                selectedOption={formMode}
                onChange={handleModeChange}
            />
            {
                formMode == 'Add Product' 

                && 

                <AddProductForm></AddProductForm>
            }

            {
                formMode == 'Edit Product'

                && 

                <EditProductForm></EditProductForm>
            }

            {
                formMode == 'Delete Product'

                && 

                <DeleteProduct></DeleteProduct>
            }
        </>
    );
}

export default ProductManagement;
