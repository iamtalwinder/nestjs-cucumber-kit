import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Item {
  @Field(() => ID)
  _id: string;

  @Field()
  name: string;
}
