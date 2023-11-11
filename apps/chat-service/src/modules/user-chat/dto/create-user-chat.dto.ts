export class CreateUserChatDto {
  documentId: string;

  name: string;

  imageUrl: string;
}

export class MessageUserChatDto {
  data: CreateUserChatDto;

  token: string;
}
