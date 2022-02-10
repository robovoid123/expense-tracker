const calculateTotal = (records) => {
  let total = 0;
  records.forEach((record) => {
    if (record.type === "income") total += record.amount;
    else if (record.type === "expense") total -= record.amount;
    else throw new Error("unexpected record type");
  });
  return total;
};

const calculateTotalIncome = (records) => {
  let total = 0;
  records.forEach((record) => {
    if (record.type === "income") total += record.amount;
  });
  return total;
};

const calculateTotalExpense = (records) => {
  let total = 0;
  records.forEach((record) => {
    if (record.type === "expense") total += record.amount;
  });
  return total;
};

module.exports = {
  calculateTotal,
  calculateTotalExpense,
  calculateTotalIncome,
};
