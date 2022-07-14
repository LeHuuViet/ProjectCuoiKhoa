import React, { useEffect, useState } from "react";
import { getVendor } from "../../service/vendor";
import "../Product/Product.scss";

function Vendor() {
  const [inputVendor, setInputVendor] = useState("");
  const [vendor, setVendor] = useState([]);
  const [value, setValue] = useState('')

  const handleVendorInput = (e) => {
    setInputVendor(e.target.value);
  };
  const handleCallApiVendor = async () => {
    const [data, error] = await getVendor(inputVendor);
    setVendor(data.data ? data.data : []);
  };
  const handleChooseOption = (e) => {
    setInputVendor(e.target.outerText);
  }

  useEffect(() => {
    handleCallApiVendor();
  }, [inputVendor]);

  return (
    <li className="d-flex vendor-input" style={{ marginRight: "40px" }}>
      <label>Vendor</label>
      <div className="vendor-input__wrapper">
        <input
          onChange={handleVendorInput}
          type="text"
          className="products-search-input border"
          value={inputVendor}
        />
        {!!inputVendor && vendor.length > 0 && (
          <div className="vender-selection">
            {vendor.map((item) => (
              <div key={item.id} value={item.id} onClick={e => handleChooseOption(e)}>{item.name}</div>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default Vendor;
