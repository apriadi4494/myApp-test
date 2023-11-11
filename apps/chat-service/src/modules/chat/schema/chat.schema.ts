import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat extends Document {
  @Prop({ type: Types.ObjectId, ref: 'UserChat' })
  sender: string;

  @Prop({ type: Types.ObjectId, ref: 'UserChat' })
  receiver: Types.ObjectId;

  @Prop()
  roomId: Types.ObjectId;

  @Prop()
  message: string;

  @Prop()
  readAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
