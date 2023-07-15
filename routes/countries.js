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

router.route("/").post(createCountry).get(getAllCountries);
router.route("/all").get(getAllCountriesStatic);
router.route("/single/:name").get(getCountry);
router.route("/:name").patch(updateCountry).delete(deleteCountry);

module.exports = router;
