import { Test, TestingModule } from '@nestjs/testing';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { RegionDto } from './dto/region.dto';

describe('RegionController', () => {
  let controller: RegionController;
  let service: RegionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionController],
      providers: [
        {
          provide: RegionService,
          useValue: {
            fetchRegions: jest.fn().mockResolvedValue([
              {
                name: 'Test region 1',
                latitude: "N 9.0\u00b0",
                longitude: "E 8.0\u00b0",
                region_id: 2,
                states: 5
              },
              {
                name: 'Test region 2',
                latitude: "N 10.0\u00b0",
                longitude: "E 8.0\u00b0",
                region_id: 3,
                states: 15
              },
            ]),
            createRegion: jest.fn().mockImplementation((region: RegionDto) => Promise.resolve({ _id: 1, ...region })),
            fetchSingleRegion: jest.fn().mockResolvedValue({
              name: 'Test region 1',
              latitude: "N 9.0\u00b0",
              longitude: "E 8.0\u00b0",
              region_id: 2,
              states: 5
            },)
          }
        }
      ]
    }).compile();

    controller = module.get<RegionController>(RegionController);
    service = module.get<RegionService>(RegionService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('retrieveRegions()', () => {
    it('should return a list of Regions', () => {
      expect(controller.retrieveRegions()).resolves.toEqual({
        success: true,
        message: 'Regions retrieved successfully.',
        data: [
          {
            name: 'Test region 1',
            latitude: "N 9.0\u00b0",
            longitude: "E 8.0\u00b0",
            region_id: 2,
            states: 5
          },
          {
            name: 'Test region 2',
            latitude: "N 10.0\u00b0",
            longitude: "E 8.0\u00b0",
            region_id: 3,
            states: 15
          },
        ]
      })
    })
  })


  describe('create()', () => {
    it('should create a new region', async () => {
      const region: RegionDto = {
        name: 'Test region 14',
        latitude: "S 10.0\u00b0",
        longitude: "E 8.0\u00b0",
        region_id: 4,
        states: 10
      }
      expect(controller.createRegion(region)).resolves.toEqual({
        success: true,
        message: 'Region created successfully',
        data: { _id: 1, ...region }
      })
    })
  })
});
