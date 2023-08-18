import { IsString } from 'class-validator';

export class ItemDto {
  @IsString()
  name: string;
}
