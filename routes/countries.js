const express = require("express");
const router = express.Router();

const {
  getAllCountriesStatic,
  createCountry,
  getCountry,
  updateCountry,
  deleteCountry,
  getAllCountries,
} = require("../controllers/tasks");

router.route("/api/countries").post(createCountry).get(getAllCountries);
router.route("/api/countries/all").get(getAllCountriesStatic);
router.route("/api/countries/single/:name").get(getCountry);
router.route("/api/countries/:name").patch(updateCountry).delete(deleteCountry);

module.exports = router;
