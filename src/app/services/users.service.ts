import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DatabaseService<User>{
  constructor() { super('users'); }
}
