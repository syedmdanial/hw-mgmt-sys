export const formatPercentage = (amount) => {
  const amountPercentage = amount * 100;

  if (
    Number.isInteger(amountPercentage) ||
    amountPercentage.toFixed(3) % 1 === 0
  ) {
    return `${amountPercentage.toFixed(0)}%`;
  }
  return `${amountPercentage}%`;
};

export const formatAmount = (amount) => {
  const fAmount = amount.toFixed(2);

  if (fAmount >= 0) {
    return `MYR ${fAmount}`;
  } else {
    return `- MYR ${fAmount * -1}`;
  }
};
