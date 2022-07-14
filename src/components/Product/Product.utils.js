import moment from "moment/moment";

export const productColumns = (handleCheckAndUnCheck) => [
  {
    name: (
      <input name="checkbox" type="checkbox" onClick={handleCheckAndUnCheck} />
    ),
    selector: (row) => <input name="checkbox" type={"checkbox"} />,
    width: "50px",
  },
  {
    name: "SKU",
    selector: (row) => row.sku,
    width: "150px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => (
      <a href="" style={{ color: "#007bff" }}>
        {row.name}
      </a>
    ),
    width: "300px",

    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row.category,
    width: "250px",
  },
  {
    name: "Price",
    selector: (row) => <input value={row.price} />,
    width: "150px",

    sortable: true,
  },
  {
    name: "Instock",
    selector: (row) => <input value={row.amount} />,
    width: "150px",
    sortable: true,
  },
  {
    name: "Vendor",
    selector: (row) => (
      <a href="" style={{ color: "#007bff" }}>
        {row.vendor}
      </a>
    ),
    width: "300px",
    sortable: true,
  },
  {
    name: "Arrival Date",
    selector: (row) =>
      moment.unix(Number.parseInt(row.arrivalDate)).format("ll"),
    width: "200px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => (
      <button className="product-delete">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
        </svg>
      </button>
    ),
  },
];
