export interface AuthResponseInterface {
  status_code: number;
  message: string;
  success: boolean;
  access_token?: string;
}
