import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Promise, Types } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

const mockUser = {
  email: 'user@test.com',
  password: '1234',
  phoneNumber: '09121231231',
  role: 'CUSTOMER',
  addresses: [],
  active: true,
};

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            exists: jest.fn(),
            create: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user service', async () => {
    jest.spyOn(model, 'exists').mockResolvedValue(null);
    const { email, password, phoneNumber } = mockUser;
    const createdUser = await service.createUser(email, password, phoneNumber);
    expect(createdUser).toEqual(mockUser);
  });
});
