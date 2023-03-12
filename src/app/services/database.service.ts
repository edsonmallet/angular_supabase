import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Base } from "../models/base.model";
import { ICrud } from "./crud.interface";

export class DatabaseService <T extends Base> implements ICrud<T> {

  table: string;
  private supabaseUrl: string;
  private supabaseKey: string;
  private supabase: SupabaseClient

  private  _getPagination = (page, size) => {
    const limit = size ? +size : 3
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1

    return { from, to }
  };

  constructor(table: string) {
    this.table = table;
    this.supabaseUrl = "https://evygwbsnfjsohvvwdjkd.supabase.co";
    this.supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2eWd3YnNuZmpzb2h2dndkamtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1Njk2NzQsImV4cCI6MTk5NDE0NTY3NH0.iJ8HfnSMooGaPeBjH5PRJbnMv2CyXLjSHWcbkezNPe4";

    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  async get(t: T) {
    const { data, error } = await this.supabase.from(this.table).select().eq('id', t.id). single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async getAll(limit?: number, page?: number) {

    const query = this.supabase.from(this.table).select();
    if (limit) query.limit(limit);
    if (page) {
      const { from, to } = this._getPagination(page, limit);
      query.range(from, to);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }


  async create(t: T) {
    const { data, error } = await this.supabase.from(this.table).insert(t);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async update(t: T) {
    const { data, error } = await this.supabase.from(this.table).update(t).eq('id', t.id);
    if (error) {
      throw new Error(error.message);
    }
    return data;

  }
  async delete(t: T) {
    const { data, error } = await this.supabase.from(this.table).delete().eq('id', t.id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
