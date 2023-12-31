Feature: MongoDB

  Background: Load data
    Given I load fixture from the file "fixture/item.fixture"

  Scenario: Find a single item and store the result
    Given I store the key "itemName" with the value "test"
    When I findOne in model "Item" with JSON and store in "item":
      """
      { "name": "{{itemName}}" }
      """
    Then the key "item" should contain JSON:
      """
      { "_id": "1", "name": "{{itemName}}" }
      """

  Scenario: Assert exact match for a single item
    When I findOne in model "Item" with JSON:
      """
      { "name": "test" }
      """
    And the result should contain JSON:
      """
      { "_id": "1", "name": "test" }
      """

  Scenario: Find multiple items and store the results
    When I find in model "Item" with JSON and store in "items":
      """
      { "name": "test" }
      """
    Then the key "items" should contain JSON:
      """
      [{ "_id": "1", "name": "test" }, { "_id": "2", "name": "test" }]
      """

  Scenario: Assert truthy & falsy
    When I findOne in model "Item" with JSON:
      """
      { "name": "test" }
      """
    Then the result should be truthy
    And I findOne in model "Item" with JSON:
      """
      { "name": "test12344" }
      """
    Then the result should be falsy

