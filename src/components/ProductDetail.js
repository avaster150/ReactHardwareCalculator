import { useSelector } from "react-redux";
import NotFound from "./NotFound";
function ProductDetail(props) {
  const id = props.match.params.name;
  const products = useSelector((state) => state.allProducts.data);
  const product = products.filter((item) => item.pname === id);
  return (
    <>
      {product[0] ? (
        <div className="product-container">
          <div className="product-details-box">
            <h1 className="product-name">{product[0].pname}</h1>
            <div className="product-details-info">
              <div className="product-details-info-company">
                {product[0].category === "others" ? (
                  <>
                    <p>
                      Category: <b>{product[0].customCategory}</b>
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Category: <b>{product[0].category}</b>
                    </p>
                  </>
                )}
                <p>
                  Company: <b>{product[0].cname}</b>
                </p>
              </div>
              <div className="product-details-info-cost">
                <p>
                  Quantity: <b>{product[0].quantity}</b>
                </p>
                <p>
                  Cost: <b>{product[0].quantity * product[0].cost}$</b>
                </p>
              </div>
              <div className="product-details-info-optional">
                {product[0].category === "Hard driver" ? (
                  <>
                    <p>
                      Memory: <b>{product[0].hmemory}</b>
                    </p>
                    <p>
                      Type: <b>{product[0].htype}</b>
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {product[0].category === "Graphics card" ? (
                  <>
                    <p>
                      Memory: <b>{product[0].gmemory}</b>
                    </p>
                    <p>
                      Memory Type: <b>{product[0].gmemoryType}</b>
                    </p>
                  </>
                ) : (
                  <></>
                )}

                {product[0].category === "CPU" ? (
                  <>
                    <p>
                      Cores: <b>{product[0].cores}</b>
                    </p>
                    <p>
                      Frequency: <b>{product[0].frequency}</b>
                    </p>
                  </>
                ) : (
                  <></>
                )}

                {product[0].category === "Motherboard" ? (
                  <p>
                    Chipset: <b>{product[0].chipset}</b>
                  </p>
                ) : (
                  <></>
                )}

                {product[0].category === "RAM" ? (
                  <>
                    <p>
                      Type: <b>{product[0].rtype}</b>
                    </p>
                    <p>
                      Memory: <b>{product[0].rmemory}</b>
                    </p>
                  </>
                ) : (
                  <></>
                )}

                {product[0].category === "Power supply" ? (
                  <p>
                    Power: <b>{product[0].power} W</b>
                  </p>
                ) : (
                  <></>
                )}

                {product[0].category === "Monitor" ? (
                  <p>
                    Inches: <b>{product[0].inches}</b>
                  </p>
                ) : (
                  <></>
                )}

                {product[0].category === "Mouse" ? (
                  <p>
                    DPI: <b>{product[0].dpi}</b>
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
}
export default ProductDetail;
