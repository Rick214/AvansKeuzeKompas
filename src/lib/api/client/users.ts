import type { UserDto } from '../dto/user.dto';
import { apiClient } from './apiClient';

export async function login(email: string, password: string): Promise<UserDto> {
	return apiClient<UserDto>('/user/login', {
		method: 'POST',
		body: { email, password }
	});
}
export async function getUser(): Promise<UserDto> {
	return apiClient<UserDto>('/user/getUserInfo', {
		method: 'GET',
		retries: 2,
		retryDelay: 300
	});
}
