# features/http.feature

Feature: http

  Scenario: Get an item
    Given I send a GET request to API "/item"
    Then the response code should be 200
    And the response should contain JSON
      """
      [{ "id": "1", "name": "test" }]
      """

  Scenario: Create an item
    Given I send a POST request to API "/item" with JSON:
      """
      {"key": "value"}
      """
    Then the response code should be 201
