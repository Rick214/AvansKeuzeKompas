import type { UserDto } from '../dto/user.dto';
import { apiClient } from './apiClient';

export async function Login(email: string, password: string): Promise<UserDto> {
  return apiClient<UserDto>("/user/login", {
    method: "POST",
    body: { email, password }
  });
}