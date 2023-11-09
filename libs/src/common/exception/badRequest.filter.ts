import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as _ from 'lodash';

@Catch(BadRequestException)
export class BadRequestExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost): any {
    if (_.isArray(exception.response.message)) {
      exception = new BadRequestException(
        (exception.message = exception.response.message.toString()),
      );
    }

    return super.catch(exception, host);
  }
}
