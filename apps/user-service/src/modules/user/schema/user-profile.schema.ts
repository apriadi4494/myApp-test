import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserProfile extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  birthday: Date;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ type: [String], default: [] })
  interests: string[];
}

export const UserProfileSchema = SchemaFactory.createForClass(UserProfile);
