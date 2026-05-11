import { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './Cart';
import Auth from './Auth';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    axios.get('https://ecommerce-backend.onrender.com')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    const exists = cart.find(item => item._id === product._id);
    if (exists) {
      setCart(cart.map(item =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="App">
      <header>
        <h1>🛍️ My Shop</h1>
        <div className="header-right">
          {user ? (
            <div className="user-info">
              <span>👋 {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Log out</button>
            </div>
          ) : (
            <button className="login-btn" onClick={() => setAuthOpen(true)}>Log in</button>
          )}
          <div className="cart-icon" onClick={() => setCartOpen(true)}>
            🛒 {cartCount} items — ${cartTotal.toFixed(2)}
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <p className="loading">Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="category">{product.category}</span>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="price">${product.price}</span>
                    <button onClick={() => addToCart(product)}>Add to cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {cartOpen && (
  <Cart
    cart={cart}
    setCart={setCart}
    onClose={() => setCartOpen(false)}
    user={user}
    onAuthNeeded={() => setAuthOpen(true)}
  />
)}

  {authOpen && (
        <Auth onLogin={handleLogin} onClose={() => setAuthOpen(false)} />
      )}
    </div>
  );
}

export default App;