import { Controller, Post, Body, Res, Get, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Res() res: Response,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('gender') gender: string,
    @Body('birthday') birthday: { month: string; day: string; year: string },
    @Body('profilePic') profilePic?: string,
  ) {
    console.log('Received registration data:', { firstName, lastName, username, password, email, gender, birthday, profilePic });
    try {
      const user = await this.authService.register(firstName, lastName, username, password, email, gender, birthday, profilePic);
      res.status(201).json({ message: 'Registration successful. Check your email for confirmation.', user });
    } catch (error: any) {
      console.error('Registration error:', error.message, error.stack);
      res.status(400).json({ error: error.message });
    }
  }

  @Post('login')
  async login(
    @Res() res: Response,
    @Body('identifier') identifier: string,
    @Body('password') password: string,
  ) {
    console.log('Received login data:', { identifier, password });
    try {
      const user = await this.authService.login(identifier, password);
      res.status(200).json({ user });
    } catch (error: any) {
      console.error('Login error:', error.message, error.stack);
      res.status(401).json({ error: error.message });
    }
  }

  @Get('recover')
  async recoverPassword(
    @Res() res: Response,
    @Body('email') email: string,
  ) {
    console.log('Received recover password request:', { email });
    try {
      const { message, token } = await this.authService.recoverPassword(email);
      res.status(200).json({ message, token });
    } catch (error: any) {
      console.error('Recover password error:', error.message, error.stack);
      res.status(400).json({ error: error.message });
    }
  }

  @Put('reset')
  async resetPassword(
    @Res() res: Response,
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    console.log('Received reset password request:', { token, newPassword });
    try {
      const user = await this.authService.resetPassword(token, newPassword);
      res.status(200).json({ message: 'Password reset successful', user });
    } catch (error: any) {
      console.error('Reset password error:', error.message, error.stack);
      res.status(400).json({ error: error.message });
    }
  }
}