import { EntityRepository, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException, NotImplementedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
   async signUp(authCredentialsDto: AuthCredentialsDto){
     const {userName, password} = authCredentialsDto;

     const salt = await bcrypt.genSalt();
     const user = new User();
     user.userName =  userName;
     user.password = await this.hashPassword(password, salt);

    try{
      await user.save();
    } catch(error){
      if(error.code === '2305'){
        throw new ConflictException("Username already exists")
      } else {
        throw new InternalServerErrorException();
      }
    }
   }

   async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { userName, password } = authCredentialsDto;
    const user = await this.findOne({ userName });

    if (user && await user.validatePassword(password)) {
      return user.userName;
    } else {
      return null;
    }
  }

   private async hashPassword(password: string, salt: string): Promise<string>{
     return bcrypt.hash(password, salt)
   }
}