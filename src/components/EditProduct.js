import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { EDIT_PRODUCT } from "../store/actions";

function EditProduct(props) {
  const id = props.match.params.name;
  const products = useSelector((state) => state.allProducts.data);
  const product = products.filter((item) => item.pname === id);
  const dispatch = useDispatch();
  const history = useHistory();
  const [productInfo, setProductInfo] = useState({
    category: product[0].category,
    customCategory: product[0].customCategory,
    pname: product[0].pname,
    cname: product[0].cname,
    cost: product[0].cost,
    quantity: product[0].quantity,
    // OPTIONAL
    // CPUS
    cores: product[0].cores,
    frequency: product[0].frequency,
    // HARD DRIVERS
    hmemory: product[0].hmemory,
    htype: product[0].htype,
    // GRAPHICS CARD
    gmemory: product[0].gmemory,
    gmemoryType: product[0].gmemoryType,
    // MOTHERBOARD
    chipset: product[0].chipset,
    // RAM
    rtype: product[0].rtype,
    rmemory: product[0].rmemory,
    // POWER SUPPLY
    power: product[0].power,
    // MONITOR
    inches: product[0].inches,
    // MOUSE
    dpi: product[0].dpi,
  });
  const [categoryError, setCategoryError] = useState(false);
  const [customCategoryError, setcustomCategoryError] = useState(false);
  const [pnameError, setPnameError] = useState(false);
  const [cnameError, setCnameError] = useState(false);
  const [costError, setCostError] = useState(false);
  const handleProduct = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (productInfo.category === "") {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }
    if (
      productInfo.category === "others" &&
      productInfo.customCategory === ""
    ) {
      setcustomCategoryError(true);
    } else {
      setcustomCategoryError(false);
    }
    if (productInfo.pname === "") {
      setPnameError(true);
    } else {
      setPnameError(false);
    }
    if (productInfo.cname === "") {
      setCnameError(true);
    } else {
      setCnameError(false);
    }
    if (productInfo.cost === "") {
      setCostError(true);
    } else {
      setCostError(false);
    }
    if (
      productInfo.category &&
      productInfo.pname &&
      productInfo.cname &&
      productInfo.cost
    ) {
      if (
        productInfo.category === "others" &&
        productInfo.customCategory === ""
      )
        return;
      dispatch(EDIT_PRODUCT(product[0], productInfo));
      let path = `/`;
      history.push(path);
    }
  };
  return (
    <>
      <div className="new-product-containter">
        <h2 className="new-product-title">Edit your product!</h2>
        <form className="new-product-form">
          <div className="form-item">
            <label className="form-label" htmlFor="category-select">
              Choose category*
            </label>
            <select
              className="form-select"
              name="category"
              id="category-select"
              value={productInfo.category}
              onChange={handleProduct}
            >
              <option value="">Choose your product category!</option>
              <option value="Hard driver">Hard driver</option>
              <option value="Graphics card">Graphics card</option>
              <option value="CPU">CPU</option>
              <option value="Motherboard">Motherboards</option>
              <option value="RAM">RAM</option>
              <option value="Power supply">Power supply</option>
              <option value="Monitor">Monitor</option>
              <option value="Keybord">Keybord</option>
              <option value="Mouse">Mouse</option>
              <option value="Headphones">Headphones</option>
              <option value="Speakers">Speakers</option>
              <option value="Mouse pad">Mouse pad</option>
              <option value="others">Others</option>
            </select>
            {categoryError ? (
              <p className="error-msg">Please select category!</p>
            ) : (
              <></>
            )}
          </div>
          {productInfo.category === "others" ? (
            <div className="form-item">
              <label className="form-label" htmlFor="customCategory">
                Product custom category*
              </label>
              <input
                className="form-input"
                type="text"
                name="customCategory"
                id="customCategory"
                placeholder="Product custom category"
                value={productInfo.customCategory}
                onChange={handleProduct}
              />
              {customCategoryError ? (
                <p className="error-msg">Please enter your custom category!</p>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className="form-item">
            <label className="form-label" htmlFor="pname">
              Product name*
            </label>
            <input
              className="form-input"
              type="text"
              name="pname"
              id="pname"
              placeholder="Product name"
              value={productInfo.pname}
              onChange={handleProduct}
            />
            {pnameError ? (
              <p className="error-msg">Please enter product name!</p>
            ) : (
              <></>
            )}
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="pname">
              Company name*
            </label>
            <input
              className="form-input"
              type="text"
              name="cname"
              id="cname"
              placeholder="Company name"
              value={productInfo.cname}
              onChange={handleProduct}
            />
            {cnameError ? (
              <p className="error-msg">Please enter product company!</p>
            ) : (
              <></>
            )}
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="pname">
              Cost $*
            </label>
            <input
              className="form-input"
              type="number"
              name="cost"
              id="cost"
              placeholder="Cost"
              value={productInfo.cost}
              onChange={handleProduct}
            />
            {costError ? (
              <p className="error-msg">Please enter product cost!</p>
            ) : (
              <></>
            )}
          </div>
          <div className="form-item">
            <label className="form-label" htmlFor="quantity-select">
              Choose quantity*
            </label>
            <select
              className="form-select"
              name="quantity"
              id="quantity-select"
              value={productInfo.quantity}
              onChange={handleProduct}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          {/* Hard driver */}
          {productInfo.category === "Hard driver" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="hmemory">
                  Hard driver memory
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="hmemory"
                  id="hmemory"
                  placeholder="Hard driver memory"
                  value={productInfo.hmemory}
                  onChange={handleProduct}
                />
              </div>
              <div className="form-item">
                <label className="form-label" htmlFor="htype">
                  Hard driver type
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="htype"
                  id="htype"
                  placeholder="Hard driver type"
                  value={productInfo.htype}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          {/* Graphics card */}
          {productInfo.category === "Graphics card" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="gmemory">
                  Graphics card memory
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="gmemory"
                  id="gmemory"
                  placeholder="Graphics card memory"
                  value={productInfo.gmemory}
                  onChange={handleProduct}
                />
              </div>
              <div className="form-item">
                <label className="form-label" htmlFor="gmemoryType">
                  Graphics card memory type
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="gmemoryType"
                  id="gmemoryType"
                  placeholder="Graphics card memory type"
                  value={productInfo.gmemoryType}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {/* CPU */}
          {productInfo.category === "CPU" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="cores">
                  CPU cores
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="cores"
                  id="cores"
                  placeholder="CPU cores"
                  value={productInfo.cores}
                  onChange={handleProduct}
                />
              </div>
              <div className="form-item">
                <label className="form-label" htmlFor="frequency">
                  CPU frequency
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="frequency"
                  id="frequency"
                  placeholder="CPU frequency"
                  value={productInfo.frequency}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Motherboard */}
          {productInfo.category === "Motherboard" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="chipset">
                  Motherboard chipset
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="chipset"
                  id="chipset"
                  placeholder="Motherboard chipset"
                  value={productInfo.chipset}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {/*RAM */}
          {productInfo.category === "RAM" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="rmemory">
                  RAM memory
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="rmemory"
                  id="rmemory"
                  placeholder="RAM memory"
                  value={productInfo.rmemory}
                  onChange={handleProduct}
                />
              </div>

              <div className="form-item">
                <label className="form-label" htmlFor="rtype">
                  RAM type
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="rtype"
                  id="rtype"
                  placeholder="RAM type"
                  value={productInfo.rtype}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Power supply */}
          {productInfo.category === "Power supply" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="power">
                  Power supply power in W
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="power"
                  id="power"
                  placeholder="Power supply power in W"
                  value={productInfo.power}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Monitor */}
          {productInfo.category === "Monitor" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="inches">
                  Monitor inches
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="inches"
                  id="inches"
                  placeholder="Monitor inches"
                  value={productInfo.inches}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Mouse */}
          {productInfo.category === "Mouse" ? (
            <>
              <div className="form-item">
                <label className="form-label" htmlFor="dpi">
                  Mouse DPI
                </label>
                <input
                  className="form-input"
                  type="text"
                  name="dpi"
                  id="dpi"
                  placeholder="Mouse DPI"
                  value={productInfo.dpi}
                  onChange={handleProduct}
                />
              </div>
            </>
          ) : (
            <></>
          )}
          <div className="form-button-container">
            <button className="form-button" onClick={handleAddProduct}>
              Save!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default EditProduct;
