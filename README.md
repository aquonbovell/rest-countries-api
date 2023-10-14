# rest-countries-api
 
The provided Swagger specification defines an API for accessing and managing information about countries. Here's a short description of each endpoint within this API:

1. **GET /api/countries/single/{country}**:
   - **Summary**: Retrieve information for a single country.
   - **Description**: This endpoint allows you to get detailed information about a specific country by providing its name or identifier as a path parameter.
   - **Response**: Returns the country's information in the response.

2. **GET /api/countries/all**:
   - **Summary**: Retrieve information for all countries.
   - **Description**: Use this endpoint to fetch a list of information for all countries.
   - **Response**: Returns a list of all countries' data in the response.

3. **PATCH /api/countries/{country}**:
   - **Summary**: Update country information.
   - **Description**: This endpoint lets you update information for a specific country. You need to specify the country name or identifier in the path parameter and provide the updated data in the request body.
   - **Response**: Indicates a successful update of the country information.

4. **POST /api/countries**:
   - **Summary**: Create a new country.
   - **Description**: Use this endpoint to create a new country entry with the provided data. The request body should include information about the country.
   - **Response**: Indicates the successful creation of a new country.

5. **DELETE /api/countries/{country}**:
   - **Summary**: Delete a country.
   - **Description**: This endpoint allows you to delete a specific country by providing its name or identifier as a path parameter.
   - **Response**:
