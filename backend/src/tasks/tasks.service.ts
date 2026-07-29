import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

export interface RawTaskResult {
  id: number;
  title: string;
  description: string | null;
  status: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const { title, description, location } = dto;
    const [longitude, latitude] = location.coordinates;

    const [newTask] = await this.prisma.$queryRaw<RawTaskResult[]>`
      INSERT INTO "hafifa"."tasks" ("title", "description", "location")
      VALUES (
        ${title}, 
        ${description ?? null}, 
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)
      )
      RETURNING id, title, description, status, ST_AsGeoJSON(location)::json AS location;
    `;

    return newTask;
  }

  async findAllGeoJson() {
    const tasks = await this.prisma.$queryRaw<RawTaskResult[]>`
      SELECT 
        id, 
        title, 
        description, 
        status, 
        ST_AsGeoJSON(location)::json AS location
      FROM "hafifa"."tasks"
      WHERE location IS NOT NULL;
    `;

    return {
      type: 'FeatureCollection',
      features: tasks.map((task) => ({
        type: 'Feature',
        geometry: task.location,
        properties: {
          id: task.id,
          title: task.title,
          description: task.description,
          status: task.status,
        },
      })),
    };
  }
}