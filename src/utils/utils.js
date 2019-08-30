export const recalculateTotalAmountToPay = (
  array,
  multiplicand,
  multiplicandWithPriority,
  multiplier
) => {
  let result = 0;
  array.forEach(element => {
    if (element[multiplicandWithPriority]) {
      result += element[multiplicandWithPriority] * element[multiplier];
    } else {
      result += element[multiplicand] * element[multiplier];
    }
  });
  return result;
};
