# Countries API

The Countries API provides information about countries and allows you to perform various operations on country data. This API is designed to be simple and easy to use.

## API Endpoints

### Get Information for a Single Country

- **URL:** `/api/countries/single/{country}`
- **Method:** `GET`
- **Description:** Get detailed information for a single country by providing its name or code.
- **Parameters:**
  - `country` (path parameter) - The name or code of the country.
- **Response:** Returns detailed information about the specified country if found.

### Get Information for All Countries

- **URL:** `/api/countries/all`
- **Method:** `GET`
- **Description:** Get information for all countries available in the database.
- **Response:** Returns a list of all countries with basic information.

### Update Country Information

- **URL:** `/api/countries/{country}`
- **Method:** `PATCH`
- **Description:** Update information for a specific country.
- **Parameters:**
  - `country` (path parameter) - The name or code of the country.
- **Request Body:** Requires a JSON object with the following properties:
  - `subregion` (string) - The subregion of the country.
  - `region` (string) - The region of the country.
  - `population` (integer) - The population of the country.
- **Response:** Returns a success message upon updating the country information.

### Create a New Country

- **URL:** `/api/countries`
- **Method:** `POST`
- **Description:** Create a new country entry in the database.
- **Request Body:** Requires a JSON object with information about the new country. The request body should include properties such as name, flags, translations, and more.
- **Response:** Returns a success message and the newly created country's details.

### Delete a Country

- **URL:** `/api/countries/{country}`
- **Method:** `DELETE`
- **Description:** Delete a country from the database.
- **Parameters:**
  - `country` (path parameter) - The name or code of the country.
- **Response:** Returns a success message upon deleting the specified country.

## Getting Started

To use the Countries API, follow these steps:

1. Make requests to the specified endpoints using the appropriate HTTP methods (GET, POST, PATCH, DELETE).
2. Include required parameters in your requests, as described in the API documentation.
3. Receive responses with the requested data or confirmation messages.

## Examples

Here are some example requests you can make to the API:

- **Get Information for a Single Country:**
  ```
  GET /api/countries/single/UnitedStates
  ```

- **Get Information for All Countries:**
  ```
  GET /api/countries/all
  ```

- **Update Country Information:**
  ```
  PATCH /api/countries/UnitedStates
  Request Body:
  {
    "subregion": "North America",
    "region": "Americas",
    "population": 331915073
  }
  ```

- **Create a New Country:**
  ```
  POST /api/countries
  Request Body: (Include necessary country information)
  ```

- **Delete a Country:**
  ```
  DELETE /api/countries/UnitedStates
  ```

## API Version

The current version of the API is `1.1`. Be sure to include the version number in your requests.

## Error Handling

The API may return error responses with appropriate status codes and error messages. Make sure to handle these errors in your applications.

## Feedback and Support

If you have any questions, feedback, or need support, please contact us at aquon_bovell@outlook.com.

## License

This API is provided under the [MIT License](LICENSE).

---

Feel free to adapt this README to your project's specific requirements. You should also provide information about authentication, rate limits, and any additional details that users of your API might need to know.
