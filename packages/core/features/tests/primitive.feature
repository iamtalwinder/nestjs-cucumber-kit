# features/primitive.feature

Feature: Primitive value responses

  Scenario: Get a boolean value
    When I send a GET request to API "/primitive/boolean"
    Then the response should be boolean true

  Scenario: Get a number value
    When I send a GET request to API "/primitive/number"
    Then the response should be number 42

  Scenario: Get a string value
    When I send a GET request to API "/primitive/string"
    Then the response should be string "Hello, World!"
