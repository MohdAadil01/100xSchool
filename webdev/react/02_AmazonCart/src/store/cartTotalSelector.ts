import { atom } from "recoil";

export const cartTotalAtom = atom({
  key: "cartTotal",
  default: {
    items: 4,
    totalPrice: 184996,
  },
});
