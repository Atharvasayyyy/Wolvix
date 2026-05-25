const slugify = require("slugify");

const createUniqueSlug = async (Model, text) => {
  const base = slugify(text, { lower: true, strict: true });
  let slug = base;
  let count = 1;

  while (await Model.exists({ slug })) {
    slug = `${base}-${count}`;
    count += 1;
  }

  return slug;
};

module.exports = createUniqueSlug;
