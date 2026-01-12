import type { Module } from '$lib/types/vkm';
import type { ModuleDto } from '$lib/api/dto/vkmsDto';
import { mapModuleDto } from '$lib/mappers/vkm.mapper';
import { token } from '$lib/stores/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function getModules(): Promise<Module[]> {
  let tokenValue: string | null = null;

  token.subscribe(t => {
    tokenValue = t;
  })(); // meteen unsubscribe

  // if (!tokenValue) throw new Error("No auth token");

  console.log(tokenValue);

  const res = await fetch(`${API_URL}/vkm`, {
    headers: {
      'Authorization': `Bearer ${tokenValue}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch modules');
  }

  const data: ModuleDto[] = await res.json();
  return data.map(mapModuleDto);
}

export async function getModulesById(id: string): Promise<Module> {
  const res = await fetch(`${API_URL}/vkm/GetById/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch modules');
  }

  const data: ModuleDto = await res.json();
  return mapModuleDto(data);
}
