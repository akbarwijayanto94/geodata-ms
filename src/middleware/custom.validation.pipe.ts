import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import _ from 'lodash'

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype, type } = metadata

    if (this.isValidate(metatype)) {
      return value
    }

    if (_.isEmpty(value) && type === 'body') {
      throw new HttpException('No payload provided', HttpStatus.BAD_REQUEST)
    }

    const object = plainToInstance(metatype, value)

    if (object === undefined) return object

    const errors = await validate(object)
    if (errors.length > 0) {
      if (errors[0].children.length > 0) {
        const message = Object.values(errors[0].children[0].children[0].constraints!)[0]
        throw new HttpException(message, HttpStatus.BAD_REQUEST)
      }
      const message = Object.values(errors[0].constraints!)[0]
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }

    return object
  }

  /** Returns true if the 'thing' doesn't need to be validated by our custom validator */
  private isValidate(metatype): boolean {
    const types = [Function, String]
    return types.includes(metatype)
  }
}
