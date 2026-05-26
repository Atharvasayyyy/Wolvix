const getPagination = (query, defaults = {}) => {
  const page = Math.max(Number(query.page || defaults.page || 1), 1);
  const limit = Math.min(Math.max(Number(query.limit || defaults.limit || 12), 1), defaults.maxLimit || 50);
  return {
    page,
    limit,
    skip: (page - 1) * limit
  };
};

module.exports = getPagination;
