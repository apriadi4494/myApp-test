import mongoose from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  async createProfile(payload: CreateProfileDto, req): Promise<UserProfile> {
    try {
      //check is profle exist
      const profile = await this.getProfile(req);
      if (profile) throw new BadRequestException('Profile already exist');

      const userProfile = await this.userProfileModel.create({
        ...payload,
        user: req.user.id,
      });
      return userProfile;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async updateProfile(payload: CreateProfileDto, req): Promise<UserProfile> {
    try {
      const updateProfile = await this.userProfileModel.findOneAndUpdate(
        { user: req.user.id },
        payload,
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

  async getProfile(req): Promise<UserProfile> {
    try {
      const userProfile = await this.userProfileModel.findOne({
        user: req.user.id,
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
