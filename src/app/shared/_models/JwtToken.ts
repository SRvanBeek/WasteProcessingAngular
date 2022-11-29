export class JwtToken {
  private access_token?: string;

  public get Token(){
    return this.access_token;
  }
}
