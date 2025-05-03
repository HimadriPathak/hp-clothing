import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
  TOGGLE_CART_OPEN = "TOGGLE_CART_OPEN",
  SET_CART_ITEMS = "SET_CART_ITEMS",
}

export type CartItem = CategoryItem & {
  quantity: number;
};
