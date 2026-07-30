import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { describe, beforeEach, afterEach, it } from 'node:test';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    create: jest.fn(),
    findAllGeoJson: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call TasksService.create and return the result', async () => {
      const dto: CreateTaskDto = {
        title: 'משימה חדשה',
        location: { type: 'Point', coordinates: [34.78, 32.08] },
      };

      const mockResponse = { id: 1, title: 'משימה חדשה', status: 'PENDING', location: dto.location };
      mockTasksService.create.mockResolvedValue(mockResponse);

      const result = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('findAll', () => {
    it('should call TasksService.findAllGeoJson and return FeatureCollection', async () => {
      const mockGeoJson = {
        type: 'FeatureCollection',
        features: [],
      };

      mockTasksService.findAllGeoJson.mockResolvedValue(mockGeoJson);

      const result = await controller.findAll();

      expect(service.findAllGeoJson).toHaveBeenCalled();
      expect(result).toEqual(mockGeoJson);
    });
  });
});