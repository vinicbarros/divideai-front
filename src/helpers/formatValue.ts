const formattedValue = (value: number) => {
  return new Intl.NumberFormat("pt-Br", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
};

export default formattedValue;
