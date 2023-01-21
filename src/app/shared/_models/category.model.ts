export class CategoryModel {
  id: number;
  name: string;
  conditions:string[];
  enabled:boolean;

  constructor(id: number, name: string, conditions: string[], enabled: boolean) {
    this.id = id;
    this.name = name;
    this.conditions = conditions;
    this.enabled = enabled;
  }

  get getName(): string {
    return this.name;
  }
}
