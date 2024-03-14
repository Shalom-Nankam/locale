import { Test, TestingModule } from '@nestjs/testing';
import { StateService } from './state.service';
import { Model } from 'mongoose';
import { State } from './interfaces/state.interface';
import test from 'node:test';


const testState = {
  "region_id": 1,
  "name": "Katsina",
  "capital": "Katsina",
  "slogan": "Home of Hospitality",
  "land_mass": "24,192 km²",
  "local_government_areas": 34,
  "state_id": 20
}

const testStateList = [
  {
    "region_id": 1,
    "name": "Katsina",
    "capital": "Katsina",
    "slogan": "Home of Hospitality",
    "land_mass": "24,192 km²",
    "local_government_areas": 34,
    "state_id": 20
  },
  {
    "region_id": 2,
    "name": "Kano",
    "capital": "Kano",
    "slogan": "Home of Trade",
    "land_mass": "24,192 km²",
    "local_government_areas": 20,
    "state_id": 21
  }
]
describe('StateService', () => {
  let service: StateService;
  let model: Model<State>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateService,
        {
          provide: 'STATE_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(testState),
            constructor: jest.fn().mockResolvedValue(testState),
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
            create: jest.fn()
          }
        },
        {
          provide: 'LGA_MODEL',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    model = module.get<Model<State>>('STATE_MODEL')

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all states', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(testStateList)
    } as any)
    const states = await service.fetchAllStates()

    expect(states).toEqual(testStateList);
  })
  it('should create a new state', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        "region_id": 1,
        "name": "Katsina",
        "capital": "Katsina",
        "slogan": "Home of Hospitality",
        "land_mass": "24,192 km²",
        "local_government_areas": 34,
        "state_id": 20
      } as any)
    )
    const createdState = await service.createState({
      "region_id": 1,
      "name": "Katsina",
      "capital": "Katsina",
      "slogan": "Home of Hospitality",
      "land_mass": "24,192 km²",
      "local_government_areas": 34,
      "state_id": 20
    })

    expect(createdState).toEqual(testState);
  })

  it('should fetch a single state', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(testState)
    } as any);
    const region = await service.fetchSingleState(1)
    expect(region).toEqual(testState)
  })
});
