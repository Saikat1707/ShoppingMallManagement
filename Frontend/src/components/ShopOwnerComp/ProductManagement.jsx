// src/components/ShopOwnerDashboard/ProductManagement/ProductManagement.js
import React, { useState } from 'react';
import '../../CSS/ComponentCSS/ShopOwnerCompCss/ProductManagement.css';

const ProductManagement = ({ activeShop }) => {
  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Mock data
  const mockProducts = [
    {
      id: 1,
      name: "Haircut",
      category: "Service",
      price: 250,
      description: "Professional haircut service",
      status: "active",
      shop: "Smart Salon"
    }
  ];

  const addProduct = (productData) => {
    // TODO: Implement API call
    // POST /api/product
    console.log('Adding product:', productData);
    const newProduct = {
      ...productData,
      id: Date.now(),
      shop: activeShop?.name || 'Unknown Shop'
    };
    setProducts([...products, newProduct]);
    setShowProductForm(false);
  };

  const updateProduct = (productId, productData) => {
    // TODO: Implement API call
    // PUT /api/product/:id
    console.log('Updating product:', productId, productData);
    setProducts(products.map(product => 
      product.id === productId ? { ...product, ...productData } : product
    ));
    setEditingProduct(null);
  };

  const deleteProduct = (productId) => {
    // TODO: Implement API call
    // DELETE /api/product/:id
    console.log('Deleting product:', productId);
    setProducts(products.filter(product => product.id !== productId));
  };

  const getProductsByShop = (shopId) => {
    // TODO: Implement API call
    // GET /api/product/shop/:shopId
    console.log('Fetching products for shop:', shopId);
    return mockProducts;
  };

  return (
    <div className="product-management">
      <div className="page-header">
        <h2>Product Management</h2>
        <button 
          className="btn-primary"
          onClick={() => setShowProductForm(true)}
          disabled={!activeShop}
        >
          + Add Product
        </button>
      </div>

      {!activeShop && (
        <div className="alert-banner">
          ⚠️ Please select an active shop to manage products
        </div>
      )}

      {activeShop && (
        <>
          {showProductForm && (
            <ProductForm
              onSubmit={addProduct}
              onCancel={() => setShowProductForm(false)}
            />
          )}

          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onSubmit={(data) => updateProduct(editingProduct.id, data)}
              onCancel={() => setEditingProduct(null)}
            />
          )}

          <div className="products-grid">
            {products.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛍️</div>
                <h4>No Products Added</h4>
                <p>Start adding products and services to your shop.</p>
                <button 
                  className="btn-primary"
                  onClick={() => setShowProductForm(true)}
                >
                  Add Your First Product
                </button>
              </div>
            ) : (
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => setEditingProduct(product)}
                  onDelete={() => deleteProduct(product.id)}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    price: product?.price || '',
    description: product?.description || '',
    status: product?.status || 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{product ? 'Edit Product' : 'Add New Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              required
            >
              <option value="">Select Category</option>
              <option value="Service">Service</option>
              <option value="Product">Product</option>
              <option value="Package">Package</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {product ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <div className="product-header">
        <h3>{product.name}</h3>
        <span className={`status-badge ${product.status}`}>
          {product.status}
        </span>
      </div>
      
      <div className="product-category">
        {product.category}
      </div>
      
      <div className="product-price">
        ₹{product.price}
      </div>
      
      <p className="product-description">
        {product.description}
      </p>
      
      <div className="product-actions">
        <button onClick={onEdit} className="btn-secondary">
          Edit
        </button>
        <button onClick={onDelete} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;