import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '../../../common/guards/auth.guard';
import { LoginService } from './services/login.service';
import { LoginDTO } from './interfaces/login.dto';
import { requiredBody, successResponse, failureResponse } from './login.docs';
import { UserDTO } from './interfaces/user.dto';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiBody(requiredBody)
  @ApiResponse(successResponse)
  @ApiResponse(failureResponse)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async postLogin(@Body() loginDto: LoginDTO): Promise<UserDTO> {
    return await this.loginService.signIn(loginDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/protected')
  async getProtected(@Request() request) {
    return request.user;
  }
}
