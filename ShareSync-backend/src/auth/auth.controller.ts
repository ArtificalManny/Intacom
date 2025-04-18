import { Controller, Post, Body, Get, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    console.log('AuthController: Raw login request body:', body);
    const email = body.email;
    const password = body.password;
    console.log('AuthController: Extracted email:', email, 'password:', password);
    if (!email || !password) {
      console.log('AuthController: Missing email or password in request body');
      throw new UnauthorizedException('Email and password are required');
    }
    try {
      const user = await this.authService.login(email, password);
      console.log('AuthController: Login successful, user:', user);
      return user;
    } catch (error) {
      console.error('AuthController: Login error:', error.message);
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('register')
  async register(@Body() body: any) {
    console.log('AuthController: Raw register request body:', body);
    const registerDto = {
      email: body.email,
      password: body.password,
      username: body.username,
      firstName: body.firstName,
      lastName: body.lastName,
      birthday: body.birthday,
    };
    console.log('AuthController: Register DTO:', registerDto);
    try {
      const user = await this.authService.register(registerDto);
      console.log('AuthController: Register successful, user:', user);
      return user;
    } catch (error) {
      console.error('AuthController: Register error:', error.message);
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    console.log('AuthController: Forgot password request received for email:', email);
    if (!email) {
      throw new UnauthorizedException('Email is required');
    }
    try {
      const resetLink = await this.authService.forgotPassword(email);
      return { message: 'Password reset link sent (simulated)', resetLink };
    } catch (error) {
      console.error('AuthController: Forgot password error:', error.message);
      throw new UnauthorizedException(error.message);
    }
  }

  @Post('reset-password/:token')
  async resetPassword(@Body('newPassword') newPassword: string, @Body('token') token: string) {
    console.log('AuthController: Reset password request received with token:', token);
    if (!newPassword || !token) {
      throw new UnauthorizedException('New password and token are required');
    }
    try {
      await this.authService.resetPassword(token, newPassword);
      return { message: 'Password reset successful' };
    } catch (error) {
      console.error('AuthController: Reset password error:', error.message);
      throw new UnauthorizedException(error.message);
    }
  }

  @Get('me')
  async getCurrentUser(@Req() req: Request) {
    const user = (req as any).user;
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.authService.getCurrentUser(user.sub);
  }

  @Post('logout')
  async logout() {
    return { message: 'Logged out successfully' };
  }
}