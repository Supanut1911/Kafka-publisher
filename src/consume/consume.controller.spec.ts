import { Test, TestingModule } from '@nestjs/testing';
import { ConsumeController } from './consume.controller';

describe('ConsumeController', () => {
  let controller: ConsumeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumeController],
    }).compile();

    controller = module.get<ConsumeController>(ConsumeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
