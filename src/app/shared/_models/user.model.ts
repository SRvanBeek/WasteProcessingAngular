export class User{

  id: number;
  username: string;
  name: string;
  enabled: boolean;



  constructor(id: number, username: string, name: string, enabled: boolean) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.enabled = enabled;
  }
}
