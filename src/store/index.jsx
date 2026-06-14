import { create } from "zustand";

const useStore = create((set) => ({
  allCars: [],
  cart: [],
  setCart: (cart) => set({ cart }),
  setAllCars: (cars) => set({ allCars: cars })
}));
export default useStore;