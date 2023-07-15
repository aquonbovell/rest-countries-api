const Country = require("../models/country");
const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllCountriesStatic = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const countries = await Country.find({})
    .skip(skip)
    .limit(limit)
    .sort("name")
    .select("name capital region population languages flag");
  res
    .status(StatusCodes.OK)
    .json({ ok: true, countries, nbHits: countries.length });
};

const getAllCountries = async (req, res) => {
  const { name, independent, sort, region, numericFilters, fields } = req.query;
  const queryObject = {};

  if (independent) {
    queryObject.independent = independent === "true" ? true : false;
  }
  if (region) {
    queryObject.region = region;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["population", "area"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let result = Country.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("name");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const countries = await result;

  res
    .status(StatusCodes.OK)
    .json({ ok: true, countries, nbHits: countries.length });
};

const createCountry = async (req, res) => {
  const { name: name } = req.body;
  const country = await Country.findOne({ name: name });
  if (country) {
    throw new BadRequestError(`Country exists with name: ${name}`);
  }
  const newCountry = new Country(req.body);
  await newCountry.save({ validateBeforeSave: true }); // Bypasses validation

  res.status(StatusCodes.CREATED).json({ success: true, newCountry });
};

const getCountry = async (req, res) => {
  const { name } = req.params;
  const queryObject = {};

  if (name) {
    queryObject.name = name;
  }

  const country = await Country.findOne(queryObject);

  res.status(StatusCodes.OK).json({ country });
};

const updateCountry = async (req, res) => {
  const { name: name } = req.params;
  if (name === "") {
    throw new BadRequestError(`Name cannot be empty.`);
  }
  const country = await Country.findOneAndUpdate({ name: name }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!country) {
    throw new NotFoundError(`No country with name: ${name}`);
  }
  res.status(StatusCodes.OK).json({ country });
};

const deleteCountry = async (req, res) => {
  const { name: name } = req.params;
  if (name === "") {
    throw new BadRequestError(`Name cannot be empty.`);
  }
  const country = await Country.findOneAndRemove({ name: name }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!country) {
    throw new NotFoundError(`No country with name: ${name}`);
  }
  res.status(StatusCodes.OK).json({ status: "success" });
};

module.exports = {
  getAllCountriesStatic,
  getAllCountries,
  createCountry,
  getCountry,
  updateCountry,
  deleteCountry,
};
