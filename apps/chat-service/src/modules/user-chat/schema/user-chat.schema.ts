import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserChat extends Document {
  @Prop()
  documentId: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop({ required: false })
  imageUrl: string;
}

export const UserChatSchema = SchemaFactory.createForClass(UserChat);
