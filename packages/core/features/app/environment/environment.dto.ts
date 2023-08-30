import { IsNumber } from 'class-validator';
import { EnvironmentInterface } from './environment.interface';

export class EnvironmentDto implements EnvironmentInterface {
  @IsNumber()
  public port: number;
}
