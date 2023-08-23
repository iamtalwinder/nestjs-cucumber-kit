# features/graphql.feature

Feature: GraphQL API interaction

  Scenario: Retrieve an item by ID
    Given I send a GraphQL request to "/graphql" with the payload:
      """
      query {
        getItem(id: "1") {
          id
          name
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "getItem": {
            "id": "1",
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
          id
          name
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "createItem": {
            "id": "*",
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
          id
          name
        }
      }
      """
    Then the response should contain JSON:
      """
      {
        "data": {
          "updateItem": {
            "id": "1",
            "name": "Updated Item"
          }
        }
      }
      """

