export class CategoryModel {
  id: number;
  name: string;
  voorwaarde:string;
  enabled:boolean;

  constructor(id: number, name: string, voorwaarde: string, customerid: string, enabled: boolean) {
    this.id = id;
    this.name = name;
    this.voorwaarde = voorwaarde;
    this.enabled = enabled;
  }

  get getName(): string {
    return this.name;
  }
}
