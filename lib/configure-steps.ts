import { IStepDefinition } from './steps';

export function configureSteps(stepClasses: Array<new () => IStepDefinition>) {
  stepClasses.forEach(StepClass => {
    const stepInstance = new StepClass();
    stepInstance.defineSteps();
  });
}
