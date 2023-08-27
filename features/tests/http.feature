# features/http.feature

Feature: HTTP

  Background: Load data
    Given I load fixture from the file "fixture/item.fixture"

  Scenario: Get an item - partial match
    Given I send a GET request to API "/item"
    Then the response code should be 200
    And the response should contain JSON:
      """
      [{ "_id": "1" }]
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

  Scenario: Send Request with custom header
    Given I set the request header "Authorization" to "Bearer token"
    When I send a POST request to API "/item" with JSON:
      """
      { "name": "New Item" }
      """
    Then the response code should be 201
