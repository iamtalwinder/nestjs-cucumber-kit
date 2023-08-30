import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ItemDto {
  @Field()
  @IsString()
  name: string;
}
