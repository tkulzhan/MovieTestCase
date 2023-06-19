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
import { UserPipe } from 'src/pipes/UserPipe';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @Redirect('movies', 201)
  async login(@Body() loginDTO: LoginUserDto, @Res() res: Response) {
    const token = await this.userService.login(loginDTO);
    return res.cookie('token', token, { maxAge: 3 * 3600 * 1000 });
  }

  @Post('register')
  @Redirect()
  @UsePipes(UserPipe)
  register(@Body() registerDTO: RegisterUserDto) {
    return this.userService.register(registerDTO);
  }
}
