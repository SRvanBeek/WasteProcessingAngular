export class CategoryModel {
  id: number;
  name: string;
  voorwaarde:string;
  customerid: string;

  constructor(id: number, name: string, voorwaarde: string, customerid: string) {
    this.id = id;
    this.name = name;
    this.voorwaarde = voorwaarde;
    this.customerid = customerid;
  }

  get getName(): string {
    return this.name;
  }
}
