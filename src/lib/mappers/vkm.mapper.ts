// $lib/mappers/module.mapper.ts
import type { ModuleDto } from '$lib/api/dto/vkmsDto';
import type { Module } from '$lib/types/vkm';

function parseArrayString(value: string): string[] {
  try {
    return JSON.parse(value.replace(/'/g, '"'));
  } catch {
    return [];
  }
}

export function mapModuleDto(dto: ModuleDto): Module {
  return {
    id: dto.id,
    name: dto.name,
    shortdescription: dto.shortdescription,
    description: dto.description,
    content: dto.content,
    studycredit: dto.studycredit,
    location: parseArrayString(dto.location),
    contact_id: dto.contact_id,
    level: dto.level,
    learningoutcomes: dto.learningoutcomes,
    popularity_score: dto.popularity_score,
    estimated_difficulty: dto.estimated_difficulty,
    available_spots: dto.available_spots,
    start_date: new Date(dto.start_date),
    tags: parseArrayString(dto.module_tags),
    themes: parseArrayString(dto.theme_tags)
  };
}
