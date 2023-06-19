import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { LoginDTO } from './dto/loginDTO';
import { RegisterDTO } from './dto/registerDTO';
import { hash, compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  login(loginDTO: LoginDTO) {}

  async register(registerDTO: RegisterDTO) {
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
