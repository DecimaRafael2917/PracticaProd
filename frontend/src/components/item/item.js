function Item({ product }) {
  return (
    <tr>
      <th scope="row">{product.id}</th>
      <td>{product.name}</td>
      <td>${Number(product.price).toFixed(2)}</td>
      <td>{product.barcode[0]}</td>
    </tr>
  );
}

export default Item;
