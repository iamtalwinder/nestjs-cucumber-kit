# features/storage.feature

Feature: storage

  Scenario: Store single value
    Given I store the key "username" with the value "John Doe"
    And the key "username" should have the value "John Doe"

  Scenario: Store json
    Given I store the key "user" with the JSON data:
      """
      { "name": "John Doe", "age": 30 }
      """
    And the key "user" should contain the JSON:
      """
      { "name": "John Doe", "age": 30 }
      """

  Scenario: Load key-value pairs from a JSON file
    Given I load key-value pairs from the JSON file "user.json"
    Then the key "username" should have the value "john123"
    And the key "user" should contain the JSON:
      """
      { "name": "John Doe", "age": 30 }
      """

  Scenario: Use in API call
    Given I store the key "itemId" with the value "1"
    Given I send a GET request to API "/item/{{itemId}}"
    Then the response code should be 200
    And the response should contain JSON:
      """
      { "id": "1", "name": "test" }
      """

  Scenario: Store and assert response
    Given I store the key "itemId" with the value "1"
    Given I send a GET request to API "/item/{{itemId}}"
    And I store the response in key "itemResponse"
    Then the key "itemResponse" should contain the JSON:
      """
      { "id": "1", "name": "test" }
      """

