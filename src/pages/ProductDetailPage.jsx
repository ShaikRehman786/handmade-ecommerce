import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product detail:', err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width="300" />
      <p>Price: ₹{product.price}</p>
      <p>Rating: ⭐{product.rating}</p>
      <p>Description: {product.description}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
