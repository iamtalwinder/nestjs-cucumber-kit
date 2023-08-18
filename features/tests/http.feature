# features/http.feature

Feature: HTTP

  Scenario: Get an item
    Given I send a GET request to API "/item"
    Then the response code should be 200
    And the response should contain JSON
      """
      [{ "id": "1", "name": "test" }]
      """

  Scenario: Create an item - success
    Given I send a POST request to API "/item" with JSON:
      """
      {"name": "test"}
      """
    Then the response code should be 201

  Scenario: Create an item - fail
    Given I send a POST request to API "/item" with JSON:
      """
      {}
      """
    Then the response code should be 400
