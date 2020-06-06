const getMonthFromDateIndex = (index: number): string => {
  const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return monthNames[index];
};

export {
  getMonthFromDateIndex,
};