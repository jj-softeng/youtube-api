const { DBCategory, isValidCategory } = require("../models/Category");

const getCategories = async (req, res) => {
  try {
    const category = await DBCategory.findAll({});
    res.json(category);
  } catch (err) {
    res.json({ message: "Unable to fetch categories", err: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await DBCategory.findOne({
      where: {
        id: req.params.categoryId,
      },
    });

    if (!category) {
      return res.json({ message: "No category found!" });
    }

    return res.json(category);
  } catch (err) {
    return res.json({ message: "unable to find category", error: err.message });
  }
};

const addCategories = async (req, res) => {
  const error = await isValidCategory(req.body);
  if (error) return res.json(error.message);

  try {
    const category = await DBCategory.create({
      ...req.body,
    });
    res.json(category);
  } catch (err) {
    res.json({ message: "Unable to add Category", error: err.message });
  }
};

module.exports.getCategory = getCategory;
module.exports.addCategories = addCategories;
module.exports.getCategories = getCategories;
