import { atom } from "recoil";

export const wishListAtom = atom({
  key: "wishListItems",
  default: [
    {
      id: 1,
      title: "Nike Air Max",
      description: "Comfortable running shoes with modern design",
      totalQtyAvailable: 15,
      price: 7999,
      image: "",
    },
    {
      id: 2,
      title: "Apple Watch Series 9",
      description: "Smartwatch with fitness and health tracking",
      totalQtyAvailable: 8,
      price: 42999,
      image: "",
    },
    {
      id: 3,
      title: "Sony WH-1000XM5",
      description: "Noise cancelling wireless headphones",
      totalQtyAvailable: 12,
      price: 29999,
      image: "",
    },
    {
      id: 4,
      title: "Gaming Chair",
      description: "Ergonomic gaming chair with lumbar support",
      totalQtyAvailable: 5,
      price: 14999,
      image: "",
    },
  ],
});
