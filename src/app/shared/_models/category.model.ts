export class Category{
  id: number;
  name: String;
  voorwaarde: String;
  enabled: boolean;

  constructor(id: number, name: String, voorwaarde: String, enabled: boolean) {
    this.id = id;
    this.name = name;
    this.voorwaarde = voorwaarde;
    this.enabled = enabled;
  }

}
