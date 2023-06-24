import { Controller, Post, Body, UsePipes, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUserDto';
import { RegisterUserDto } from './dto/registerUserDto';
import { JoiValidationPipe } from '../pipes/JoiValidationPipe';
import { Response, Request } from 'express';
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
      message: 'Login successful',
    });
  }

  @Post('register')
  @UsePipes(new JoiValidationPipe(UserRegisterSchema))
  async register(@Body() registerDTO: RegisterUserDto) {
    return await this.userService.register(registerDTO);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const tokenValue = req.cookies['token']
    await this.tokenService.deleteToken(tokenValue);
    res.clearCookie('token');
    return res.json({
      statusCode: 204,
      message: 'Logout successful',
    });
  }
}
