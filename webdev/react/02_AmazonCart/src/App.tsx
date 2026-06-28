import { RecoilRoot } from "recoil";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import AmazonCart from "./components/AmazonCart";
import WishList from "./components/WishList";

function App() {
  return (
    <RecoilRoot>
      <div>
        <Navbar />
        <Routes>
          <Route path="/cart" element={<AmazonCart />} />
          <Route path="/wishlist" element={<WishList />} />
        </Routes>
      </div>
    </RecoilRoot>
  );
}

export default App;
