import { useParams, Link } from 'react-router-dom';

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      <p>{params.productId}</p>
      {/* We want this path to take us to '/products' from '/products/id' but instead it takes
      us to '/'. This is because relative paths are considered relative to their parent, which
      in this case is '/'. Hence we add the prop 'relative' as 'path' to achieve the required
      behaviour. */}
      <p><Link to=".." relative='path'>Back</Link></p>
    </>
  );
}

export default ProductDetailPage;
