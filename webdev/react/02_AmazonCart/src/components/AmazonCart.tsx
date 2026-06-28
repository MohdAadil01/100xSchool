import React from "react";
import { useRecoilState } from "recoil";
import { cartItemAtom } from "../store/cartItemState";

function AmazonCart() {
  const [items, setItems] = useRecoilState(cartItemAtom);

  const increase = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item,
    );

    setItems(updated);
  };

  const decrease = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 } : item,
    );

    setItems(updated);
  };
  return (
    <div>
      {items.map((item) => (
        <Card
          key={item.id}
          title={item.title}
          description={item.description}
          price={item.price}
          qty={item.qty}
          img={item.image}
          increase={() => increase(item.id)}
          decrease={() => decrease(item.id)}
        />
      ))}
    </div>
  );
}

function Card({ title, description, price, qty, img, increase, decrease }) {
  return (
    <div>
      <div>
        <img src={img} width={100} />
      </div>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{price}</p>
        <button onClick={decrease}>-</button>
        <p>{qty}</p>
        <button onClick={increase}>+</button>
      </div>
    </div>
  );
}

export default AmazonCart;
