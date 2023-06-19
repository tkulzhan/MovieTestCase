import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserPipe implements PipeTransform<any, User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}
  transform(value: any): User {
    if (!isEmail(value.email)) {
      throw new BadRequestException('Invalid email');
    }
    const user = new this.userModel(value);
    const validationError = user.validateSync();
    if (validationError) {
      throw new BadRequestException(validationError.message);
    }
    return value;
  }
}

const isEmail = (email: string): boolean => {
  var validRegex = /^^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return validRegex.test(email);
};
