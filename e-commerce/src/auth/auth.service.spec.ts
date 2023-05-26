import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

const mockUser = {
  email: 'user@test.com',
  password: '1234',
  phoneNumber: '09121231231',
  role: 'CUSTOMER',
  addresses: [],
  active: true,
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('check create user service', async () => {
    expect(
      await service.creatUser(
        mockUser.email,
        mockUser.password,
        mockUser.phoneNumber,
      ),
    ).toEqual(mockUser);
  });
});
