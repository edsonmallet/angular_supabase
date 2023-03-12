import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DatabaseService<User>{
  constructor() { super('users'); }

  async singUp(email: string, password: string ){
    let { data, error} = await this.supabase.auth.signUp({ email, password });
    return { data, error };
  }

  async singIn(email: string, password: string ){
    let { data, error} = await this.supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }
}
