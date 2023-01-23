
export class EditCategory {
  id: number;
  name: string;
  conditions: Object;
  enabled:boolean;

  constructor(name: string, conditions: Object, enabled: boolean) {
    this.name = name;
    this.conditions = conditions;
    this.enabled = enabled;
  }



}
