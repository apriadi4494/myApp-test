export class CreateUserChatDto {
  documentId: string;

  name: string;

  email: string;

  username: string;

  imageUrl: string;
}

export class MessageUserChatDto {
  data: CreateUserChatDto;

  token: string;
}
