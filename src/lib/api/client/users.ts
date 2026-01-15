import type { ChosenModule } from '$lib/models/chosenModule.model';
import type { UserDto } from '../dto/user.dto';
import type { UserSettingsDto } from '../dto/userSettings.dto';
import { apiClient } from './apiClient';

export async function login(email: string, password: string): Promise<UserDto> {
	return apiClient<UserDto>('/user/login', {
		method: 'POST',
		body: { email, password }
	});
}

export async function getUser(): Promise<UserDto> {
	return apiClient<UserDto>('/user/getUserInfo', {
		method: 'GET'
	});
}

export async function updateChosenModules(payload: Array<ChosenModule>) {
	return apiClient('/user/updateChoice', {
		method: 'POST',
		body: payload
	});
}

export async function updateSettings(payload: UserSettingsDto) {
	return apiClient('/user/updateSettings', {
		method: 'PATCH',
		body: payload
	});
}