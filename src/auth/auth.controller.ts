import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../libs/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('validate')
  async validate(@Body() body: { email: string; pass: string }): Promise<User> {
    const { email, pass } = body;

    try {
      return await this.authService.validateUser(email, pass);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
