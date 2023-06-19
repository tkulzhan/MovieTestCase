import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO } from './dto/loginDTO';
import { RegisterDTO } from './dto/registerDTO';
import { UserPipe } from 'src/pipes/UserPipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.userService.login(loginDTO);
  }

  @Post('register')
  @UsePipes(UserPipe)
  register(@Body() registerDTO: RegisterDTO) {
    return this.userService.register(registerDTO);
  }
}
