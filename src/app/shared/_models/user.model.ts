export class User{

  id: number;
  username: string;
  name: string;
  enabled: boolean;
  password: string;


  constructor(id: number, username: string, name: string, enabled: boolean, password: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.enabled = enabled;
    this.password = password;
  }
}
