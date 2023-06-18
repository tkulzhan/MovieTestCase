import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ObjectIdPipe implements PipeTransform<any, string> {
  transform(value: any): string {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid ObjectID');
    }
    return value;
  }
}
