import { UserEntity } from './entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name } = createUserDto;

    const userEntity = new UserEntity();
    // userEntity.id = id;
    userEntity.name = name;
    try {
      await userEntity.save();
      return userEntity;
    } catch (error) {
      console.log(error);
      console.log(error.code);
      console.log('--------------');
      if (error.code === '23505') {
        throw new ConflictException(['token already exists']);
      } else if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(['token already exists']);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // async getAllTokens(): Promise<TokensEntity[]> {
  //   const query = this.createQueryBuilder('token');
  //   const tokens = await query.getMany();
  //   return tokens;
  // }
}
