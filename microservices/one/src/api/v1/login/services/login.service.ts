import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UserDTO } from '../interfaces/user.dto';
import { LoginDTO } from '../interfaces/login.dto';
import { UnauthorizedException } from '@nestjs/common';

export type SignedInUser = Omit<UserDTO, 'password'> & { accessToken: string };

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDTO): Promise<UserDTO> {
    if (!this.usersService.isUserRegistered(loginDto)) {
      throw new UnauthorizedException('User not Registered');
    }

    const registeredUser = await this.usersService.saveUser(loginDto);
    const { _id, username, hashedPassword: password } = registeredUser;

    const accessToken = await this.jwtService.signAsync(
      registeredUser.toJSON(),
    );

    return new UserDTO(_id.toString(), username, password, accessToken);
  }
}
