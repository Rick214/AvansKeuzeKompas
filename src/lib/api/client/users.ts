import type { ChosenModule } from '$lib/models/chosenModule.model';
import type { UserDto } from '../dto/user.dto';
import type { UserSettingsDto } from '../dto/userSettings.dto';
import { apiClient } from './apiClient';

export async function login(email: string, password: string, token?: string): Promise<UserDto> {
	return apiClient<UserDto>('/user/login', token, {
		method: 'POST',
		body: { email, password }
	});
}

export async function getUser(token: string): Promise<UserDto> {
	return apiClient<UserDto>('/user/getUserInfo', token, {
		method: 'GET'
	});
}

export async function updateChosenModules(payload: Array<ChosenModule>, token: string) {
	return apiClient('/user/updateChoice', token, {
		method: 'POST',
		body: payload
	});
}

export async function updateSettings(payload: UserSettingsDto, token: string) {
	return apiClient('/user/updateSettings', token, {
		method: 'PATCH',
		body: payload
	});
}