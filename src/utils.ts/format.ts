export const snippet = (articleBody: string) => {
  return articleBody.slice(0, 150) + '...';
};

export const formatDate = (dateToFormat: string) => {
  return dateToFormat.slice(0, 10).split('-').reverse().join('-');
};
