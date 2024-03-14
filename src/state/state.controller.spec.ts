import { Test, TestingModule } from '@nestjs/testing';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { StateDto } from './dto/state.dto';

describe('StateController', () => {
  let controller: StateController;
  let service: StateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        {
          provide: StateService,
          useValue: {
            fetchAllStates: jest.fn().mockResolvedValue([
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
            ]),
            createState: jest.fn().mockImplementation((state: StateDto) => Promise.resolve({ _id: 1, ...state })),
            fetchSingleState: jest.fn().mockResolvedValue({
              "region_id": 2,
              "name": "Kano",
              "capital": "Kano",
              "slogan": "Home of Trade",
              "land_mass": "24,192 km²",
              "local_government_areas": 20,
              "state_id": 21
            },)
          }
        }
      ]
    }).compile();

    controller = module.get<StateController>(StateController);
    service = module.get<StateService>(StateService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('fetchAllStates()', () => {
    it('should return a list of states', () => {
      expect(controller.fetchAllStates()).resolves.toEqual({
        success: true,
        message: 'States retrieved successfully',
        data: [
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
      })
    })
  })


  describe('create()', () => {
    it('should create a new state', async () => {
      const state: StateDto = {
        "region_id": 2,
        "name": "Kano",
        "capital": "Kano",
        "slogan": "Home of Trade",
        "land_mass": "24,192 km²",
        "local_government_areas": 20,
        "state_id": 21
      }
      expect(controller.create(state)).resolves.toEqual({
        success: true,
        message: 'State created successfully',
        data: { _id: 1, ...state }
      })
    })
  })
});
