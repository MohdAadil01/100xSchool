import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { wishListAtom } from "../store/wishItemState";
import { cartItemAtom } from "../store/cartItemState";

function WishList() {
  const setCartItems = useSetRecoilState(cartItemAtom);
  const wishlistItems = useRecoilValue(wishListAtom);

  console.log(wishlistItems);

  const onClick = () => {
    setCartItems((items) => {
      return [
        ...items,
        {
          id: 2,
          title: "added new",
          description: "added new",
          qty: 1,
          price: 23,
          image: "",
        },
      ];
    });
  };

  return (
    <div>
      {wishlistItems.map((items) => (
        <Card
          key={items.id}
          title={items.title}
          description={items.description}
          totalQty={items.totalQtyAvailable}
          price={items.price}
          imgsrc={items.image}
          onClick={onClick}
        />
      ))}
    </div>
  );
}

function Card({ title, description, totalQty, price, imgsrc, onClick }) {
  return (
    <div>
      <div>
        <img src={imgsrc} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <p>{price}</p>
        <Button text={"Add to Cart"} onClick={onClick}></Button>
      </div>
    </div>
  );
}

function Button({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

export default WishList;
