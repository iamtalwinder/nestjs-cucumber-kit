# features/upload.feature

Feature: HTTP upload

  Scenario: Uploading an image file
    Given I set the request header "Content-Type" to "multipart/form-data"
    And I upload file "image.jpeg" as form field "image"
    When I send a POST request to API "/upload"
    Then the response code should be 201
    And the response should contain JSON:
    """
    {
      "message": "File uploaded successfully"
    }
    """
