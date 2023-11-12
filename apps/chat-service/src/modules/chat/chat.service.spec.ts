// user.service.spec.ts

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ChatService } from './chat.service';
import { Chat } from './schema/chat.schema';

const mockChatModel = {
  create: jest.fn(),
  findOneAndUpdate: jest.fn(),
};

describe('ChatService', () => {
  let service: ChatService;
  let userChatModel: Model<Chat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatService,
        {
          provide: getModelToken(Chat.name),
          useValue: mockChatModel,
        },
      ],
    }).compile();

    service = module.get<ChatService>(ChatService);
    userChatModel = module.get<Model<Chat>>(getModelToken(Chat.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createChat', () => {
    it('should create a new chat', async () => {
      const mock: any = {
        receiver: 'mockUserId',
        roomId: 'mockUserId',
        message: 'testing',
        sender: 'mockUserId',
      };
      jest
        .spyOn(userChatModel, 'create')
        .mockImplementationOnce(() => Promise.resolve(mock));

      const result = await service.createChat(mock);

      expect(userChatModel.create).toHaveBeenCalledWith({
        receiver: mock.receiver,
        roomId: mock.roomId,
        message: mock.message,
        sender: mock.sender,
      });
      expect(result).toEqual(mock);
    });
  });
});
