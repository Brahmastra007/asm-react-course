import { useParams } from 'react-router-dom';

// Adding component for individual product description
function ProductDetailPage() {
  // Getting the params passed
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      {/* Getting the dynamic string 'productId' passed in the url */}
      <p>{params.productId}</p>
    </>
  );
}

export default ProductDetailPage;
