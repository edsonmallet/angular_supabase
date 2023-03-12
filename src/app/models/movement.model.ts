import { Base } from "./base.model";

export class Movement extends Base{
  type: number;
  produtct_id: number;
  quantity: number;
  current_date: Date | null;
}
