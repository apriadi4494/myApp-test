// user.service.spec.ts

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { UserProfile } from './schema/user-profile.schema';

const mockUserModel = {
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};

const mockUserProfileModel = {
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;
  let userProfileModel: Model<UserProfile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken(UserProfile.name),
          useValue: mockUserProfileModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    userProfileModel = module.get<Model<UserProfile>>(
      getModelToken(UserProfile.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const mockUser: any = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'new123Password',
        passwordConfirm: 'new123Password',
      };
      jest
        .spyOn(userModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUser));

      const result = await service.create(mockUser);

      expect(userModel.create).toHaveBeenCalledWith({
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
        passwordConfirm: mockUser.passwordConfirm,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('createProfile', () => {
    it('should create a profile', async () => {
      const mockUserId = 'mockUserId';

      const mockUserProfile: any = {
        name: 'name',
        birthday: '2023-04-04',
        height: 5,
        weight: 5,
        interests: ['interests'],
        user: mockUserId,
      };
      jest
        .spyOn(userProfileModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUserProfile));

      const result = await service.createProfile(mockUserProfile, mockUserId);

      expect(userProfileModel.create).toHaveBeenCalledWith({
        name: mockUserProfile.name,
        birthday: mockUserProfile.birthday,
        height: mockUserProfile.height,
        weight: mockUserProfile.weight,
        interests: mockUserProfile.interests,
        user: mockUserId,
      });
      expect(result).toEqual(mockUserProfile);
    });
  });

  describe('findUserById', () => {
    it('should find a user by ID', async () => {
      const mockUserId = 'mockUserId';
      const mockUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'testing123',
      };
      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(mockUser as User);

      const result = await service.findById(mockUserId);

      expect(userModel.findById).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockUser);
    });

    it('should return null if user is not found', async () => {
      const mockUserId = 'nonexistentUserId';
      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(null);

      const result = await service.findById(mockUserId);

      expect(userModel.findById).toHaveBeenCalledWith(mockUserId);
      expect(result).toBeNull();
    });
  });
});
