export interface ICrud<T> {
  get(t:T)
  getAll(limit?:number, offset?:number)
  create(t:T)
  update(t:T)
  delete(t:T)
}
