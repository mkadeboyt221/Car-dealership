import withEmpty  from "./withEmpty";

function CarList({
  data,
  cart,
  handleSelect,
  handleRemoveFromCart,
  handleEdit,
  handleDelete
}) {
  return (
    <section className="container">
      {data.map(car => {
        const isInCart = cart.some(item => item.id === car.id);

        return (
          <section className="card" key={car.id}>
            <h3 className="card-title">{car.name}</h3>
            <p><b>Model:</b> {car.model}</p>
            <p><b>Brand:</b> {car.brand}</p>

            <button
              className="card-button"
              onClick={() =>
               handleSelect(car)
              }
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            <button
              className="card-button"
              onClick={() => handleEdit(car)}
            >
              Edit
            </button>

            <button
              className="card-button"
              onClick={() => handleDelete(car.id)}
            >
              Delete
            </button>
          </section>
        );
      })}
    </section>
  );
}

export default withEmpty(CarList);