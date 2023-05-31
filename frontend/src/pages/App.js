import Title from '../components/title/title';
import { useEffect, useState } from 'react';
import { getProducts } from '../services/products';
import Item from '../components/item/item';

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.products))
      .catch(err => {
        console.log(err);
      })
  }, []);



  return (
    <div className="container">
      <Title text="Products" />
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Barcode</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (<Item product={product} />))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
