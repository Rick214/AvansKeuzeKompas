import type { UserDto } from '../dto/user.dto';
import { apiClient } from './apiClient';

export async function Favorites(vkmId: number): Promise<UserDto> {
	return apiClient<UserDto>(`/user/addFavorite/${vkmId}`, {
		method: 'POST',
	});
}