export interface UserDTO {
  id: number;
  first_name: string;
  last_name: string;
  prefix: string | null;
  password: string;
  dob: string;
  course: string;
  SLBer: string;
  dark_mode: boolean;
  notifications_enabled: boolean;
  text_size: number;
  is_docent: boolean;
  favorite_modules: Array<number>;
  chosen_modules: Array<number>;
  recommended_modules: Array<number>;
}