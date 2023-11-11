import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UserChat } from './schema/user-chat.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserChat.name)
    private readonly userModel: mongoose.Model<UserChat>,
  ) {}
}
