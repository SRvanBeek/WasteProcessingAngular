
export class EditCategory {
  id: number;
  name: string;
  conditions: Map<String, String[]>;
  enabled:boolean;

  constructor(name: string, conditions: Map<String, String[]>, enabled: boolean) {
    this.name = name;
    this.conditions = conditions;
    this.enabled = enabled;
  }



}
