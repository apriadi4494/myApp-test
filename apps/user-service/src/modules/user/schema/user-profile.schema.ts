import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { findZodiac } from 'libs/src/common/dictionary/horoscope.dictionary';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, autoIndex: true, toJSON: { virtuals: true } })
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

UserProfileSchema.virtual('zodiac').get(function () {
  const date = this.birthday.getDate();
  const month = this.birthday.getMonth() + 1; // Note: JavaScript months are zero-based

  return findZodiac(month, date);
});
