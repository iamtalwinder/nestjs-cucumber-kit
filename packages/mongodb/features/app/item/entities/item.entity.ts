import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema as SchemaDecorator, SchemaFactory } from '@nestjs/mongoose';
import { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@ObjectType()
@SchemaDecorator({
  timestamps: true,
})
export class Item {
  @Field(() => ID)
  @Prop({ default: () => uuidv4() })
  _id: string;

  @Field()
  @Prop({ required: true, type: String })
  name: string;
}

export type ItemDocument = Item & Document;

export const ItemSchema: Schema = SchemaFactory.createForClass(Item);
