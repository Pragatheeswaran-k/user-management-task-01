import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    try {
      const result = await this.authService.validateUser(loginDto.email, loginDto.password);
      return result;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
} 