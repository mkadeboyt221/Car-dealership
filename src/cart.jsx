function Cart({ cart,onRemove }) {
  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty </p>
      ) : (
        <div className="cart-container">
          {cart.map((item) => (
            <div className="cart-card" key={item.id}>
              <h3>{item.name}</h3>
              <p><b>Model:</b> {item.model}</p>
              <p><b>Brand:</b> {item.brand}</p>
               <button  onClick={()=>onRemove(item.id)}
               className="card-button">
                 Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
