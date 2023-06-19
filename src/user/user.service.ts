import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/loginUserDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { ReturnUserDto } from './dto/returnUserDto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async login(loginDTO: LoginUserDto) {
    var candidate: User;
    try {
      if (loginDTO.email) {
        candidate = await this.userModel.findOne({ email: loginDTO.email });
      } else if (loginDTO.username) {
        candidate = await this.userModel.findOne({
          username: loginDTO.username,
        });
      } else {
        throw new BadRequestException(
          'Either email or username must be provided',
        );
      }
      if (!candidate) {
        throw new BadRequestException('Email or username is wrong');
      }
      const isMatch = await compare(loginDTO.password, candidate.password);
      if (isMatch) {
        const user: ReturnUserDto = {
          username: candidate.username,
          email: candidate.email,
        };
        return user;
      } else {
        throw new BadRequestException('Mismatched password');
      }
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async register(registerDTO: RegisterUserDto) {
    try {
      const hashedPwd = await hash(registerDTO.password, 8);
      const user = new this.userModel({
        username: registerDTO.username,
        email: registerDTO.email,
        password: hashedPwd,
      });
      return await user.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('Email or username already exists.');
      } else {
        console.log(e);
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }
}
