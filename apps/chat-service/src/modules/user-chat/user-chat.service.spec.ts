// user.service.spec.ts

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { UserChatService } from './user-chat.service';
import { UserChat } from './schema/user-chat.schema';

const mockUserChatModel = {
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
};

describe('UserChatService', () => {
  let service: UserChatService;
  let userChatModel: Model<UserChat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserChatService,
        {
          provide: getModelToken(UserChat.name),
          useValue: mockUserChatModel,
        },
      ],
    }).compile();

    service = module.get<UserChatService>(UserChatService);
    userChatModel = module.get<Model<UserChat>>(getModelToken(UserChat.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUserChat', () => {
    it('should create a new chat user', async () => {
      const mockUser: any = {
        id: 'mockUserId',
        name: 'testing name',
        imageUrl: '/testing/testing.png',
      };
      jest
        .spyOn(userChatModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUser));

      const result = await service.createUserChat(mockUser);

      expect(userChatModel.create).toHaveBeenCalledWith({
        id: mockUser.id,
        name: mockUser.name,
        imageUrl: mockUser.imageUrl,
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUserChat', () => {
    it('should update chat user', async () => {
      const mockUser: any = {
        _id: 'mockUserId',
        name: 'testing name',
        imageUrl: '/testing/testing.png',
      };
      jest
        .spyOn(userChatModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockUser));

      await service.createUpdateUserChat(mockUser);

      expect(userChatModel.findOneAndUpdate).toHaveBeenCalledWith(
        { id: mockUser._id },
        {
          _id: mockUser._id,
          name: mockUser.name,
          imageUrl: mockUser.imageUrl,
        },
      );
    });
  });
});
