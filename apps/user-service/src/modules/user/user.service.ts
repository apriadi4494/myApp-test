import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
  ) {}

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
