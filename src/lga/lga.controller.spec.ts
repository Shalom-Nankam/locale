import { Test, TestingModule } from '@nestjs/testing';
import { LgaController } from './lga.controller';
import { LgaService } from './lga.service';
import { CreateLgaDto } from './dto/create-lga.dto';


describe('LgaController', () => {
  let controller: LgaController;
  let service: LgaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LgaController],
      providers: [
        {
          provide: LgaService,
          useValue: {
            fetchAll: jest.fn().mockResolvedValue([
              {
                name: 'Test Lga 1',
                state_id: 1
              },
              {
                name: 'Test Lga 2',
                state_id: 1
              },
              {
                name: 'Test Lga 3',
                state_id: 1
              },
              {
                name: 'Test Lga 4',
                state_id: 2
              },
              {
                name: 'Test Lga 5',
                state_id: 3
              },
              {
                name: 'Test Lga 6',
                state_id: 3
              },
            ]),
            create: jest.fn().mockImplementation((lgaToCreate: CreateLgaDto) => Promise.resolve({ _id: 1, ...lgaToCreate })),
            fetchStateLgas: jest.fn().mockResolvedValue([
              {
                name: 'Test Lga',
                state_id: 1
              },
              {
                name: 'Test Lga',
                state_id: 1
              },
            ]),
            fetchSingleLga: jest.fn().mockResolvedValue({
              name: 'Test Lga',
              state_id: 1
            })
          }
        }
      ]
    }).compile();

    controller = module.get<LgaController>(LgaController);
    service = module.get<LgaService>(LgaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('retrieveAll()', () => {
    it('should return a list of LGAs', () => {
      expect(controller.retrieveAll({ limit: 3, offset: 0 })).resolves.toEqual({
        success: true,
        message: 'LGAs retrieved successfully',
        data: [
          {
            name: 'Test Lga 1',
            state_id: 1
          },
          {
            name: 'Test Lga 2',
            state_id: 1
          },
          {
            name: 'Test Lga 3',
            state_id: 1
          },
          {
            name: 'Test Lga 4',
            state_id: 2
          },
          {
            name: 'Test Lga 5',
            state_id: 3
          },
          {
            name: 'Test Lga 6',
            state_id: 3
          },
        ]
      })
    })
  })


  describe('create()', () => {
    it('should create a new lga', async () => {
      const lga: CreateLgaDto = {
        name: 'New Lga',
        state_id: 2
      }

      expect(controller.create(lga)).resolves.toEqual({
        success: true,
        message: 'LGA created successfully',
        data: { _id: 1, ...lga }
      })
    })
  })

  describe('extra tests', () => {
    it('should return a list of LGAs', () => {
      expect(controller.fetchStateLgas(3)).resolves.toEqual({
        success: true,
        message: 'LGAs retrieved successfully',
        data: [
          {
            name: 'Test Lga',
            state_id: 1
          },
          {
            name: 'Test Lga',
            state_id: 1
          },
        ]
      })
    })

    it('should return an lga', () => {
      expect(controller.fetchSingle('Test Lga')).resolves.toEqual({
        success: true,
        message: 'LGA retrieved successfully',
        data: {
          name: 'Test Lga',
          state_id: 1
        }
      })

      expect(service.fetchSingleLga).toHaveBeenCalled();
    })
  })
});
