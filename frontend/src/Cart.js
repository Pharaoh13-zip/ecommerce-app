import axios from 'axios';

function Cart({ cart, setCart, onClose, user, onAuthNeeded }) {
  const updateQty = (id, amount) => {
    setCart(cart
      .map(item => item._id === id ? { ...item, qty: item.qty + amount } : item)
      .filter(item => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = async () => {
    if (!user) {
      onClose();
      onAuthNeeded();
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/checkout', { cart });
      window.location.href = res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>🛒 Your cart is empty</p>
            <button onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item._id, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item._id, 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                {user ? 'Proceed to Checkout' : 'Log in to Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;