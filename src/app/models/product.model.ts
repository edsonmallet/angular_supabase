import { Base } from "./base.model";

export class Product extends Base{
  name: string;
  description: string;
  sellValue: number;
  category_id: number;
  qunatityStock: number;
  minStock: number;

}
