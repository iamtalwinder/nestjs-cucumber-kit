import { AbstractWorld } from '../../lib';
import { AppModule } from '../app/app.module';
import { config } from './config';

export class CustomWorld extends AbstractWorld {
  constructor() {
    super(AppModule, config);
  }
}
