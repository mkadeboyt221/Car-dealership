const withActionGuard = (WrappedComponent) => {
  return function GuardedComponent(props) {

    const safeDelete = (id) => {
      if (props.data.length <= 1) {
        alert("At least one car must remain 🚗");
        return;
      }
      props.handleDelete(id);
    };

    const safeAddToCart = (car) => {
      const exists = props.cart.find(item => item.id === car.id);

      if (exists) {
        alert("Car already in cart ⚠️");
        return;
      }

      props.handleSelect(car);
    };

    return (
      <WrappedComponent
        {...props}
        handleDelete={safeDelete}
        handleSelect={safeAddToCart}
      />
    );
  };
};

export default withActionGuard;