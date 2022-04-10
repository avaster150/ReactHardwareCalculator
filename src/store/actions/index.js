export const ADD_PRODUCT = (payload) => {
  return {
    type: "ADD_PRODUCT",
    payload,
  };
};

export const DELETE_PRODUCT = (payload) => {
  return {
    type: "DELETE_PRODUCT",
    payload,
  };
};

export const CHANGE_LIST = (payload) => {
  const result = payload;
  return {
    type: "CHANGE_LIST",
    payload: result,
  };
};

export const EDIT_PRODUCT = (oldPayload, newPayload) => {
  return {
    type: "EDIT_PRODUCT",
    oldPayload,
    newPayload,
  };
};
