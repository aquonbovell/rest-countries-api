const { BadRequestError, NotFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const { connectDB } = require("../db/connect");

const getAllCountriesStatic = async (req, res) => {
  const client = await connectDB();
  const countries = await client
    .find({})
    .sort("name")
    .project({
      name: 1,
      capital: 1,
      region: 1,
      population: 1,
      languages: 1,
      flag: 1,
    })
    .toArray();
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
    // starts with and insensitive
    queryObject["name.common"] = { $regex: `^${name}`, $options: "i" };
  }
  if (numericFilters) {
    // operators: >, >=, =, <, <=
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    // replace operators with mongo operators
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["population", "area"];
    // split the string into array
    filters = filters.split(",").forEach((item) => {
      // split the item into field, operator and value
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  const sortFields = {};
  if (sort) {
    const sortList = sort.split(",");
    sortList.forEach((item) => {
      const [field, order] = item.split(":");
      sortFields[field] = order === "asc" ? 1 : -1;
    });
  } else {
    sortFields.name = 1;
  }

  const selectFields = {};
  if (fields) {
    const fieldsList = fields.split(",");

    fieldsList.forEach((field) => {
      if (field === "name") {
        selectFields["name.common"] = 1;
      } else {
        selectFields[field] = 1;
      }
    });
  } else {
    selectFields["name.common"] = 1;
    selectFields.area = 1;
    selectFields.population = 1;
    selectFields.region = 1;
    selectFields.languages = 1;
    selectFields.flag = 1;
  }
  console.log(queryObject, sortFields);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const client = await connectDB();
  let result = await client
    .find(queryObject)
    .project(selectFields)
    .sort(sortFields)
    .skip(skip)
    .limit(limit)
    .toArray();

  res.status(StatusCodes.OK).json({ ok: true, result, nbHits: result.length });
};

const createCountry = async (req, res) => {
  const { name: name } = req.body;
  const client = await connectDB();
  const country = await client.findOne({ "name.common": name });
  if (country) {
    throw new BadRequestError(`Country exists with name: ${name}`);
  }
  const newCountry = await client.insertOne(req.body);

  res.status(StatusCodes.CREATED).json({ success: true, newCountry });
};

const getCountry = async (req, res) => {
  const { name } = req.params;
  const queryObject = {};

  if (name) {
    queryObject["name.common"] = name;
  }

  const client = await connectDB();
  const country = await client.findOne(queryObject);

  res.status(StatusCodes.OK).json({ country });
};

const updateCountry = async (req, res) => {
  const { name: name } = req.params;
  if (name === "") {
    throw new BadRequestError(`Name cannot be empty.`);
  }

  const client = await connectDB();
  const country = await client.findOneAndUpdate(
    { "name.common": name },
    { $set: req.body },
    { returnDocument: "after" }
  );

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

  const client = await connectDB();
  const country = await client.findOneAndDelete({ "name.common": name });
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
