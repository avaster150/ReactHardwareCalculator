let lsProducts, storedProducts, newProducts;
const makeProductReducer = (
  state = { data: JSON.parse(localStorage.getItem("products")) || [] },
  action
) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      let doubleProduct = state.data.find(
        (item) => item.pname === action.payload.pname
      );
      if (doubleProduct) {
        alert("That product already exist!");
        return state;
      }
      lsProducts = localStorage.getItem("products") || "[]";
      storedProducts = JSON.parse(lsProducts);
      newProducts = [...storedProducts, action.payload];
      localStorage.setItem("products", JSON.stringify(newProducts));

      return {
        ...state,
        data: [...state.data, action.payload],
      };

    case "DELETE_PRODUCT":
      lsProducts = localStorage.getItem("products") || "[]";
      storedProducts = JSON.parse(lsProducts);
      const findStorageProduct = storedProducts.splice(action.payload, 1);
      newProducts = storedProducts.filter(
        (item) => item !== findStorageProduct
      );
      localStorage.setItem("products", JSON.stringify(newProducts));
      const findProduct = state.data.splice(action.payload, 1);
      const updatedProducts = state.data.filter((item) => item !== findProduct);
      return {
        ...state,
        data: updatedProducts,
      };

    case "CHANGE_LIST":
      if (!action.payload.destination) return state;
      lsProducts = localStorage.getItem("products") || "[]";
      storedProducts = JSON.parse(lsProducts);
      const items = Array.from(storedProducts);
      const [reorderedItem] = items.splice(action.payload.source.index, 1);
      items.splice(action.payload.destination.index, 0, reorderedItem);
      newProducts = items;
      localStorage.setItem("products", JSON.stringify(newProducts));
      return {
        ...state,
        data: items,
      };

    case "EDIT_PRODUCT":
      lsProducts = localStorage.getItem("products") || "[]";
      storedProducts = JSON.parse(lsProducts);

      const findStoredProductToEdit = storedProducts.filter(
        (item) => item.pname !== action.oldPayload.pname
      );
      const newStoredProductList = [
        ...findStoredProductToEdit,
        action.newPayload,
      ];
      localStorage.setItem("products", JSON.stringify(newStoredProductList));
      const findProductToEdit = state.data.filter(
        (item) => item.pname !== action.oldPayload.pname
      );
      const newProductList = [...findProductToEdit, action.newPayload];

      return {
        ...state,
        data: newProductList,
      };

    default:
      return state;
  }
};

export default makeProductReducer;
