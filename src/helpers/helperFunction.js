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

export const dataModeling = (data, key) => {
  console.log(data, key);
  let tempData = [];
  if (data.length > 0) {
    data.map((item) => {
      let _value = item[key];
      let _label = _value.charAt(0).toUpperCase() + _value.slice(1);

      return tempData.push({
        id: item._id,
        label: _label,
        value: _value,
      });
    });

    return tempData;
  }

  return tempData;
};
