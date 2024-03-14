import { Test, TestingModule } from '@nestjs/testing';
import { RegionService } from './region.service';
import { Region } from './interfaces/region.interface';
import { Model } from 'mongoose';

const testRegion = {
  name: 'Test region 1',
  latitude: "N 9.0\u00b0",
  longitude: "E 8.0\u00b0",
  region_id: 2,
  states: 5
}
const testState = {
  "region_id": 1,
  "name": "Katsina",
  "capital": "Katsina",
  "slogan": "Home of Hospitality",
  "land_mass": "24,192 km²",
  "local_government_areas": 34,
  "state_id": 20
}

const testRegionsList = [
  {
    name: 'Test region 1',
    latitude: "N 9.0\u00b0",
    longitude: "E 8.0\u00b0",
    region_id: 2,
    states: 5
  },
  {
    name: 'Test region 2',
    latitude: "N 12.0\u00b0",
    longitude: "E 15.0\u00b0",
    region_id: 1,
    states: 12
  }
]
describe('RegionService', () => {
  let service: RegionService;
  let model: Model<Region>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegionService,
        {
          provide: 'REGION_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(testRegion),
            constructor: jest.fn().mockResolvedValue(testRegion),
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
            create: jest.fn()
          }
        },
        {
          provide: 'STATE_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(testState),
            constructor: jest.fn().mockResolvedValue(testState),
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          }
        }
      ],

    }).compile();

    service = module.get<RegionService>(RegionService);
    model = module.get<Model<Region>>('REGION_MODEL')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all regions', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(testRegionsList)
    } as any)
    const regions = await service.fetchRegions()

    expect(regions).toEqual(testRegionsList);
  })
  it('should create a new region', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Test region 1',
        latitude: "N 9.0\u00b0",
        longitude: "E 8.0\u00b0",
        region_id: 2,
        states: 5
      } as any)
    )
    const createdRegion = await service.createRegion({
      name: 'Test region 1',
      latitude: "N 9.0\u00b0",
      longitude: "E 8.0\u00b0",
      region_id: 2,
      states: 5
    })

    expect(createdRegion).toEqual(testRegion);
  })

  it('should fetch a single region', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(testRegion)
    } as any);
    const region = await service.fetchSingleRegion(1)
    expect(region).toEqual(testRegion)
  })
});
