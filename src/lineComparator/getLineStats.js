const getLineStats = (currentValue, currentValue2) => {
  if (currentValue === undefined) {
    return { isSimilar: false, value: null, value2: currentValue2 };
  }
  if (currentValue2 === undefined) {
    return { isSimilar: false, value: currentValue, value2: null };
  }
  if (currentValue === currentValue2) {
    return { isSimilar: true, value: currentValue };
  }
  if (currentValue !== currentValue2) {
    return { isSimilar: false, value: currentValue, value2: currentValue2 };
  }
  return null;
};

export default getLineStats;
