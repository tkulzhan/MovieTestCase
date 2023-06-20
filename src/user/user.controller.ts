import {
  Controller,
  Post,
  Body,
  UsePipes,
  Res,
  Redirect,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginUserDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { JoiValidationPipe } from 'src/pipes/JoiValidationPipe';
import { Response } from 'express';
import { TokenService } from '../token/token.service';
import { UserRegisterSchema } from './entity/user.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  @Redirect('movies', 201)
  async login(@Body() loginDTO: LoginUserDto, @Res() res: Response) {
    const payload = await this.userService.login(loginDTO);
    const token = await this.tokenService.generateToken(payload);
    return res.cookie('token', token, { maxAge: 3 * 3600 * 1000 });
  }

  @Post('register')
  @Redirect()
  @UsePipes(new JoiValidationPipe(UserRegisterSchema))
  register(@Body() registerDTO: RegisterUserDto) {
    return this.userService.register(registerDTO);
  }
}
