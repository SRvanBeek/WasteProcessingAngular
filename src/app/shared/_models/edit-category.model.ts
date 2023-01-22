import {type} from "jquery";

export class EditCategory {
  id: number;
  name: string;
  conditions: Object;
  enabled:boolean;

  constructor(id: number, name: string, conditions: Object, enabled: boolean) {
    this.id = id;
    this.name = name;
    this.conditions = conditions;
    this.enabled = enabled;
  }

}
