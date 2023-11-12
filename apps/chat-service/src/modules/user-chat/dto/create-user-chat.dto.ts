export class CreateUserChatDto {
  _id: string;

  name: string;

  imageUrl: string;
}

export class MessageUserChatDto {
  data: CreateUserChatDto;

  token: string;
}
