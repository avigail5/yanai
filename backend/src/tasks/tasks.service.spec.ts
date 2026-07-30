import { Test, TestingModule } from '@nestjs/testing';
import { TasksService, RawTaskResult } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { describe, beforeEach, afterEach, it } from 'node:test';

describe('TasksService', () => {
  let service: TasksService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    $queryRaw: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

    afterAll(async () => {
    await module.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task and return it', async () => {
      const dto: CreateTaskDto = {
        title: 'בדיקת חיישן',
        description: 'בדיקת תקינות בשטח',
        location: {
          type: 'Point',
          coordinates: [34.7818, 32.0853],
        },
      };

      const mockDbResponse: RawTaskResult[] = [
        {
          id: 1,
          title: dto.title,
          description: dto.description ?? null,
          status: 'PENDING',
          location: {
            type: 'Point',
            coordinates: [34.7818, 32.0853],
          },
        },
      ];

      mockPrismaService.$queryRaw.mockResolvedValue(mockDbResponse);

      const result = await service.create(dto);

      expect(prismaService.$queryRaw).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockDbResponse[0]);
    });
  });

  describe('findAllGeoJson', () => {
    it('should return tasks formatted as a GeoJSON FeatureCollection', async () => {
      const mockRawTasks: RawTaskResult[] = [
        {
          id: 1,
          title: 'משימה 1',
          description: 'תיאור 1',
          status: 'OPEN',
          location: {
            type: 'Point',
            coordinates: [34.7818, 32.0853],
          },
        },
      ];

      mockPrismaService.$queryRaw.mockResolvedValue(mockRawTasks);

      const result = await service.findAllGeoJson();

      expect(result).toEqual({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [34.7818, 32.0853],
            },
            properties: {
              id: 1,
              title: 'משימה 1',
              description: 'תיאור 1',
              status: 'OPEN',
            },
          },
        ],
      });
    });
  });
});