
export class EditCategory {
  id: number;
  name: string;
  conditions: Map<string, string[]>;
  enabled:boolean;

  constructor(name: string, conditions: Map<string, string[]>, enabled: boolean) {
    this.name = name;
    this.conditions = conditions;
    this.enabled = enabled;
  }



}
