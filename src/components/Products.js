import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PRODUCT } from "../store/actions";
import { CHANGE_LIST } from "../store/actions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Pdf from "react-to-pdf";
import axios from "axios";

function Products() {
  const products = useSelector((state) => state.allProducts.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = React.createRef();
  const handleDelete = (index) => {
    dispatch(DELETE_PRODUCT(index));
  };

  const handleOnDragEnd = (result) => {
    dispatch(CHANGE_LIST(result));
    setProductFilter("");
  };

  const allProductsCost = () => {
    let totalPrice = 0;
    let itemPrice;
    let totalPriceFloor;
    products.forEach((item) => {
      itemPrice = item.cost;
      totalPrice += Number(itemPrice) * item.quantity;
      totalPriceFloor = totalPrice.toFixed(2);
    });
    if (products.length === 0) {
      return "0";
    } else {
      return totalPriceFloor;
    }
  };

  const [productFilter, setProductFilter] = useState("");
  const handleFilter = (e) => {
    setProductFilter(e.target.value);
  };

  if (productFilter === "Highest price") {
    products.sort((a, b) => b.cost - a.cost);
  } else if (productFilter === "Lowest price") {
    products.sort((a, b) => a.cost - b.cost);
  }
  const options = {
    orientation: "landscape",
  };
  const sendProductToAPI = async () => {
    try {
      await axios.post("http://localhost:5000/api", {
        payload: products,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    sendProductToAPI();
  }, []);

  return (
    <div className="products-container">
      {products[0] ? (
        <>
          <h1 className="procucts-container-title">Your products:</h1>
          <div className="product-filter">
            <select
              className="form-select"
              name="filter"
              id="filter-select"
              value={productFilter}
              onChange={handleFilter}
            >
              <option value="">Sort by:</option>
              <option value="Highest price">Highest price</option>
              <option value="Lowest price">Lowest price</option>
            </select>
          </div>
        </>
      ) : (
        <div className="products-empty">
          <h2>Add your first product!</h2>
          <button
            className="prodcuts-btn-start"
            onClick={() => history.push("/new-product")}
          >
            Create new product
          </button>
        </div>
      )}
      {products[0] ? (
        <>
          <div className="products-wrapper" ref={ref}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="products">
                {(provided) => (
                  <div
                    className="products-box-area"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {products.map((singleProduct, index) => (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="products-box"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <div className="products-info-first">
                              <p>
                                <b>{singleProduct.pname}</b>
                              </p>
                            </div>
                            <div className="products-info-second">
                              <p>
                                Company: <b>{singleProduct.cname}</b>
                              </p>
                              {singleProduct.category === "others" ? (
                                <p>
                                  Category:
                                  <b>{singleProduct.customCategory}</b>
                                </p>
                              ) : (
                                <p>
                                  Category: <b>{singleProduct.category}</b>
                                </p>
                              )}
                            </div>
                            <div className="products-info-costs">
                              <p>
                                Quantity: <b>{singleProduct.quantity}</b>
                              </p>
                              <p>
                                Cost:
                                <b>
                                  {singleProduct.quantity * singleProduct.cost}$
                                </b>
                              </p>
                            </div>
                            <div className="products-options">
                              <Link
                                className="icon-link"
                                to={`/product/${singleProduct.pname}`}
                              >
                                <i className="fa-solid fa-circle-info"></i>
                              </Link>
                              <Link
                                className="icon-link"
                                to={`/edit-product/${singleProduct.pname}`}
                              >
                                <i className="fa-solid fa-pen-to-square"></i>
                              </Link>
                              <i
                                onClick={() => handleDelete(index)}
                                className="fa-solid fa-trash-can"
                              ></i>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="product-total-cost-box">
              <p>
                Total cost: <b>{allProductsCost()}$</b>
              </p>
            </div>
          </div>
          <Pdf
            targetRef={ref}
            filename="products-list.pdf"
            options={options}
            scale={0.917}
          >
            {({ toPdf }) => (
              <button className="prodcuts-btn-start" onClick={toPdf}>
                Export to PDF
              </button>
            )}
          </Pdf>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Products;
