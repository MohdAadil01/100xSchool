import { atom } from "recoil";

export const cartItemAtom = atom({
  key: "cartItems",
  default: [
    {
      id: 1,
      title: "iPhone 15 Pro",
      description: "Apple iPhone 15 Pro 256GB Natural Titanium",
      price: 134999,
      qty: 1,
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569",
    },
    {
      id: 2,
      title: "Samsung Odyssey G5",
      description: "32-inch QHD Gaming Monitor",
      price: 24999,
      qty: 1,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    },
    {
      id: 3,
      title: "MacBook Air M3",
      description: "Apple MacBook Air 13-inch M3 Chip",
      price: 114999,
      qty: 1,
      image: "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    },
    {
      id: 4,
      title: "Mechanical Keyboard",
      description: "RGB Wireless Mechanical Keyboard",
      price: 4999,
      qty: 1,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    },
  ],
});
