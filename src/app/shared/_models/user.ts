export class User {
  id?: number;
  name?: string;
  username?: string;
  password?: string;
  enabled?: boolean;

  public static createUserWithoutId(name: string, username: string, password: string, enabled: boolean): User {
    const user = new User();
    user.name = name;
    user.username = username;
    user.password = password;
    user.enabled = enabled;
    return user;
  }

}
