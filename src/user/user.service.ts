import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>) { }

    async createUser(userToCreate: UserDto): Promise<User> {

        return this.userModel.create(userToCreate)
    }

    async findUser(email: string): Promise<User> {
        return this.userModel.findOne({ email });
    }
}
