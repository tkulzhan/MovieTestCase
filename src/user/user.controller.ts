import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/loginUserDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { UserPipe } from 'src/pipes/UserPipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() loginDTO: LoginUserDto) {
    return this.userService.login(loginDTO);
  }

  @Post('register')
  @UsePipes(UserPipe)
  register(@Body() registerDTO: RegisterUserDto) {
    return this.userService.register(registerDTO);
  }
}
