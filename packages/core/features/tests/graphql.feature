# features/graphql.feature

Feature: GraphQL API interaction

  Scenario: Retrieve an item by ID
    Given I send a GraphQL request to "/graphql" with the payload:
      """
      query {
        getItem(id: "1") {
          _id
          name
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getItem": {
            "_id": "1",
            "name": "test"
          }
        }
      }
      """

  Scenario: Successfully create a new item
    Given I send a GraphQL request to "/graphql" with the payload:
      """
      mutation {
        createItem(createItemInput: { name: "New Item" }) {
          _id
          name
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "createItem": {
            "_id": "*",
            "name": "New Item"
          }
        }
      }
      """

  Scenario: Successfully update an existing item
    Given I send a GraphQL request to "/graphql" with the payload:
      """
      mutation {
        updateItem(id: "1", updateItemInput: { name: "Updated Item" }) {
          _id
          name
        }
      }
      """
    Then the response should exactly match JSON:
      """
      {
        "data": {
          "updateItem": {
            "_id": "1",
            "name": "Updated Item"
          }
        }
      }
      """

