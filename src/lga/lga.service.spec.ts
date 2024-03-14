import { Test, TestingModule } from '@nestjs/testing';
import { LgaService } from './lga.service';
import { Model } from 'mongoose';
import { Lga } from './interfaces/lga.interface';



const sampleLga = {
  name: 'Sample Lga 1',
  state_id: 1
}

const sampleLgaList = [{
  name: 'Sample Lga 1',
  state_id: 1
},
{
  name: 'Sample Lga 2',
  state_id: 2
}
]
describe('LgaService', () => {
  let service: LgaService;
  let model: Model<Lga>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LgaService,
        {
          provide: 'LGA_MODEL',
          useValue: {
            new: jest.fn().mockResolvedValue(sampleLga),
            constructor: jest.fn().mockResolvedValue(sampleLga),
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            exec: jest.fn(),
            create: jest.fn()
          }
        }
      ],
    }).compile();

    service = module.get<LgaService>(LgaService);
    model = module.get<Model<Lga>>('LGA_MODEL')
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all Lgas', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(sampleLgaList)
    } as any)
    const lgas = await service.fetchAll(0, 0)

    expect(lgas).toEqual(sampleLgaList);
  })
  it('should create a new Lga', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Sample Lga 1',
        state_id: 1
      } as any)
    )
    const createdLga = await service.create({
      name: 'Sample Lga 1',
      state_id: 1
    })

    expect(createdLga).toEqual(sampleLga);
  })

  it('should fetch a single Lga', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(sampleLga)
    } as any);
    const lga = await service.fetchSingleLga('Sample Lga 1')
    expect(lga).toEqual(sampleLga)
  })

  it('should fetch a list of Lgas', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(sampleLgaList)
    } as any)

    const lgas = await service.fetchStateLgas(1)

    expect(lgas).toEqual(sampleLgaList)
  })

});
