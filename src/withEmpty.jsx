function withEmpty(Component) {
  return function WrappedComponent({ data, ...props }) {
    if (!data || data.length === 0) {
      return (
        <p style={{ textAlign: "center" }}>
          No cars found 🚗
        </p>
      );
    }

    return <Component data={data} {...props} />;
  };
}

export default withEmpty;