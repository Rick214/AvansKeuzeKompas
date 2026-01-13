import type { Module } from '$lib/types/vkm';
import type { ModuleDto } from '$lib/api/dto/vkmsDto';
import { mapModuleDto } from '$lib/mappers/vkm.mapper';
import { apiClient } from './apiClient';

export async function getModules(): Promise<Module[]> {
	const data = await apiClient<ModuleDto[]>('/vkm', {
		retries: 2,
		retryDelay: 300
	});
	return data.map(mapModuleDto);
}

export async function getModulesById(id: string): Promise<Module> {
	const data = await apiClient<ModuleDto>(`/vkm/GetById/${id}`, {
		retries: 2,
		retryDelay: 300
	});
	return mapModuleDto(data);
}
