import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <div>Amazon Cart</div>
      <div>
        <ul>
          <li>
            <Link to={"/wishlist"}>WishList</Link>
          </li>
          <li>
            <Link to={"/cart"}>Cart</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
