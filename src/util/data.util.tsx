const splitArrayIntoGroups = (data: any[], groupSize: number): any[][] =>
  data.reduce((accumulator, currentValue, currentIndex, array) => {
    if (currentIndex % groupSize === 0) accumulator.push(array.slice(currentIndex, currentIndex + groupSize));
    return accumulator;
  }, []);

export {
  splitArrayIntoGroups
};
