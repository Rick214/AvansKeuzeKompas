import type { Module } from '$lib/types/vkm';
import type { ModuleDto } from '$lib/api/dto/vkmsDto';
import { mapModuleDto } from '$lib/mappers/vkm.mapper';
import { apiClient } from './apiClient';

export async function getModulesDutch(): Promise<Module[]> {
	const data = await apiClient<ModuleDto[]>('/vkm');
	return data.map(mapModuleDto);
}

export async function getModulesEnglish(): Promise<Module[]> {
	const data = await apiClient<ModuleDto[]>('/vkm/getAllEnglish');
	return data.map(mapModuleDto);
}


export async function getModulesById(id: string): Promise<Module> {
	const data = await apiClient<ModuleDto>(`/vkm/GetById/${id}`);
	return mapModuleDto(data);
}
