import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should can say hello', async () => {
    const response = await controller.sayHello('Bay');
    expect(response).toBe('Hello Bay!');
  });

  it('should can say hi', async () => {
    const response = await controller.sayHi('Bay', 'U');
    expect(response).toBe('Hi, Bay U!');
  });

  it('should can view template', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Bay', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      title: 'Template Engine',
      name: 'Bay',
    });
  });
});
