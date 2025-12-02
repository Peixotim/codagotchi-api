import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Type,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsValidationPipe implements PipeTransform<unknown> {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    let parsedValue: unknown = value;

    if (typeof value === 'string') {
      try {
        parsedValue = JSON.parse(value);
      } catch (error) {
        throw new WsException(`Invalid JSON format ${error}`);
      }
    }

    const object = plainToInstance(metatype, parsedValue) as object;

    const errors = await validate(object);

    if (errors.length > 0) {
      const messages = errors.map((err) =>
        Object.values(err.constraints || {}).join(', '),
      );
      throw new WsException({ status: 'error', message: messages });
    }

    return object;
  }

  private toValidate(metatype: Type<unknown>): boolean {
    const types: Type<unknown>[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
