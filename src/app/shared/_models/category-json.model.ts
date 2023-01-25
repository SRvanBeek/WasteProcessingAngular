import {ConvMap} from "./conv-map";


export class CategoryJSON {
  constructor() {

  }

  id: number;
  name: string;
  conditions: ConvMap;
  enabled:boolean;
}
