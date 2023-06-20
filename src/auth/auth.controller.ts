import { Controller, Post, Body, UsePipes, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUserDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { JoiValidationPipe } from 'src/pipes/JoiValidationPipe';
import { Response } from 'express';
import { TokenService } from '../token/token.service';
import { UserRegisterSchema } from './entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('login')
  async login(@Body() loginDTO: LoginUserDto, @Res() res: Response) {
    const payload = await this.userService.login(loginDTO);
    const token = await this.tokenService.generateToken(payload);
    res.cookie('token', token, { maxAge: 2 * 3600 * 1000 });
    return res.json({
      statusCode: 201,
      message: 'Authorization successful',
    });
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(UserRegisterSchema))
  register(@Body() registerDTO: RegisterUserDto) {
    return this.userService.register(registerDTO);
  }
}
