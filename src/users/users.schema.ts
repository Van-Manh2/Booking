import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })  // Định nghĩa _id là string
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
