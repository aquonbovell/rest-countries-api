const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the name of the country"],
    maxlength: 52,
    trim: true,
    unique: true,
    index: true,
  },
  topLevelDomain: [
    {
      type: String,
      maxlength: 4,
      trim: true,
    },
  ],
  alpha2Code: {
    type: String,
    required: [true, "Please provide the alpha2 code of the country"],
    maxlength: 2,
    trim: true,
  },
  alpha3Code: {
    type: String,
    required: [true, "Please provide the alpha3 code of the country"],
    maxlength: 3,
    trim: true,
  },
  callingCodes: [
    {
      type: String,
      required: [true, "Please provide the calling code of the country"],
      maxlength: 5,
      trim: true,
    },
  ],
  capital: {
    type: String,
    default: "",
    maxlength: 25,
    trim: true,
  },
  altSpellings: [
    {
      type: String,
      trim: true,
    },
  ],
  subregion: {
    type: String,
    required: [true, "Please provide the subregion of the country"],
    maxlength: 25,
    trim: true,
  },
  region: {
    type: String,
    required: [true, "Please provide the region of the country"],
    maxlength: 25,
    trim: true,
  },
  population: {
    type: Number,
    required: [true, "Please provide the current population of the country"],
  },
  latlng: {
    type: [
      {
        type: Number,
        trim: true,
      },
    ],
    validate: [loglatLength, "Please provide both latitude and longditude"],
  },
  demonym: {
    type: String,
    required: [true, "Please provide the demonym of the country"],
    maxlength: 45,
    trim: true,
  },
  area: {
    type: Number,
    default: 0,
  },
  gini: {
    type: Number,
  },
  timezones: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    validate: [timezonesLength, "Please provide a timezone"],
  },
  borders: [
    {
      type: String,
      trim: true,
    },
  ],
  nativeName: {
    type: String,
    required: [true, "Please provide the native name of the country"],
    maxlength: 58,
    trim: true,
  },
  numericCode: {
    type: String,
    required: [true, "Please provide the numberic code of the country"],
    maxlength: 3,
    minlength: 3,
    trim: true,
  },
  flags: {
    svg: {
      type: String,
      required: [true, "Please provide the svg format of the country"],
      maxlength: 100,
      trim: true,
    },
    png: {
      type: String,
      required: [true, "Please provide the png format of the country"],
      maxlength: 115,
      trim: true,
    },
  },
  currencies: [
    {
      code: {
        type: String,
        default: "",
        trim: true,
      },
      name: {
        type: String,
        default: "",
        trim: true,
      },
      symbol: {
        type: String,
        default: "",
        trim: true,
      },
      _id: false,
    },
  ],
  languages: [
    {
      iso639_1: {
        type: String,
        maxlength: 2,
        default: "",
        trim: true,
      },
      iso639_2: {
        type: String,
        maxlength: 3,
        default: "",
        trim: true,
      },
      name: {
        type: String,
        maxlength: 25,
        default: "",
        trim: true,
      },
      nativeName: {
        type: String,
        maxlength: 20,
        default: "",
        trim: true,
      },
      _id: false,
    },
  ],
  translations: {
    br: {
      type: String,
      default: "",
      trim: true,
    },
    pt: {
      type: String,
      default: "",
      trim: true,
    },
    nl: {
      type: String,
      default: "",
      trim: true,
    },
    hr: {
      type: String,
      default: "",
      trim: true,
    },
    fa: {
      type: String,
      default: "",
      trim: true,
    },
    de: {
      type: String,
      default: "",
      trim: true,
    },
    es: {
      type: String,
      default: "",
      trim: true,
    },
    fr: {
      type: String,
      default: "",
      trim: true,
    },
    ja: {
      type: String,
      default: "",
      trim: true,
    },
    it: {
      type: String,
      default: "",
      trim: true,
    },
    hu: {
      type: String,
      default: "",
      trim: true,
    },
  },
  flag: {
    type: String,
    required: [true, "Please provide the flag of the country"],
    trim: true,
  },
  regionalBlocs: [
    {
      acronym: {
        type: String,
        required: [
          true,
          "Please provide the regional blocs acronym of the country",
        ],
        trim: true,
      },
      name: {
        type: String,
        required: [
          true,
          "Please provide the regional blocs name of the country",
        ],
        trim: true,
      },

      otherAcronyms: [
        {
          type: String,
          trim: true,
        },
      ],
      otherNames: [
        {
          type: String,
          trim: true,
        },
      ],
      _id: false,
    },
  ],
  cioc: {
    type: String,
    maxlength: 3,
    minlength: 3,
    trim: true,
  },
  independent: {
    type: Boolean,
    default: false,
  },
});

function loglatLength(val) {
  return val.length == 2 || val.length == 0;
}

function timezonesLength(val) {
  return val.length >= 1;
}

module.exports = mongoose.model("Country", CountrySchema, "Countries");
