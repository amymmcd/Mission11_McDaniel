import PageTitle from '../components/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function BuyPage() {
  const navigate = useNavigate();
  const { bookID, title, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No Book Found',
      price: Number(price) || 0,
      quantity: quantity,
    };
    console.log(newItem);
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <PageTitle />
      <h4>Good pick! Let's get this added to your cart.</h4>
      <br />
      <div className="row">
        <div className="col-md-8 text-start">
          <h2>{title}</h2>
          <h5>Price: ${price}</h5>
          <label>Quantity:</label>
          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(x) => setQuantity(Number(x.target.value))}
          />
        </div>
        <div className="col-md-4">
          <br />
          <button className="btn btn-success" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <br />
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyPage;
