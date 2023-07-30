export interface IStepDefinition {
  /**
   * Method to define step definitions.
   * Classes implementing this interface should use this method to register their steps.
   */
  defineSteps(): void;
}
