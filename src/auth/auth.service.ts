import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entity/user.entity';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/loginUserDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async login(loginDTO: LoginUserDto) {
    var user: UserDocument;
    try {
      if (loginDTO.email) {
        user = await this.userModel.findOne({ email: loginDTO.email });
      } else if (loginDTO.username) {
        user = await this.userModel.findOne({
          username: loginDTO.username,
        });
      } else {
        throw new BadRequestException(
          'Either email or username must be provided',
        );
      }
      if (!user) {
        throw new BadRequestException('Email or username is incorrect');
      }
      const isMatch = await compare(loginDTO.password, user.get('password'));
      if (isMatch) {
        const payload = {
          _id: user._id.toString(),
          username: user.get('username'),
          email: user.get('email'),
        };
        return payload;
      } else {
        throw new BadRequestException('Mismatched password');
      }
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      } else {
        throw new InternalServerErrorException(e.message);
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
      await user.save();
      return {
        statusCode: 201,
        message: 'Registration successful',
      };
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
