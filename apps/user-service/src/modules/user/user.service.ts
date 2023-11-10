import mongoose from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';

import { User } from './schema/user.schema';
import { RegisterDto } from '../auth/dto/registerDto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UserProfile } from './schema/user-profile.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: mongoose.Model<User>,
    @InjectModel(UserProfile.name)
    private readonly userProfileModel: mongoose.Model<UserProfile>,
  ) {}

  async create(payload: RegisterDto): Promise<User> {
    try {
      const user = await this.userModel.create(payload);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async createProfile(
    payload: CreateProfileDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<UserProfile> {
    try {
      //check is profle exist
      const profile = await this.getProfile(userId);
      if (profile) throw new BadRequestException('Profile already exist');

      const userProfile = await this.userProfileModel.create({
        ...payload,
        user: userId,
        ...(file ? { imageUrl: file.path } : null),
      });
      return userProfile;
    } catch (err) {
      if (file) fs.unlinkSync(file.path);
      throw new BadRequestException(err.message);
    }
  }

  async updateProfile(
    payload: CreateProfileDto,
    userId: string,
    file: Express.Multer.File,
  ): Promise<UserProfile> {
    try {
      const profile = await this.getProfile(userId);

      if (file && profile.imageUrl) fs.unlinkSync(profile.imageUrl);

      const updateProfile = await this.userProfileModel.findOneAndUpdate(
        { user: userId },
        {
          ...payload,
          ...(file ? { imageUrl: file.path } : null),
        },
        {
          new: true,
          runValidators: true,
        },
      );
      return updateProfile;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async getProfile(userId: string): Promise<UserProfile> {
    try {
      const userProfile = await this.userProfileModel.findOne({
        user: userId,
      });
      return userProfile;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ email });
      return user;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
