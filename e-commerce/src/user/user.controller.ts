import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get('info')
  getUserInfo(@Req() req) {
    return req.user;
  }
}
