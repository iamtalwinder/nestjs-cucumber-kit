# features/http.feature

Feature: HTTP

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

  Scenario: Store specific response path in storage
    Given I send a GET request to API "/item"
    Given I store the key "test" with the value from the response at path "body[0]._id"
    Then the key "test" should have the value "1"

  Scenario: Send Request with custom header
    Given I store the key "accessToken" with the value "token"
    Given I store the key "itemName" with the value "New Item"
    Given I set the request header "Authorization" to "Bearer {{accessToken}}"
    When I send a POST request to API "/item" with JSON:
      """
      { "name": "{{itemName}}" }
      """
    Then the response code should be 201
    And the response should contain JSON:
      """
      { "_id": "*", "name": "{{itemName}}" }
      """
