import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseResponseDto } from '../../dto/base-response.dto';
import { PaginateDto } from '../../dto/paginate.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(BaseResponseDto),
    ApiExtraModels(PaginateDto),
    ApiExtraModels(model),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(PaginateDto),
                properties: {
                  content: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};
