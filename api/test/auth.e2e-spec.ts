import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';
import { AuthModule } from './../src/auth/auth.module';
import { Prisma } from '@prisma/client';

describe('Auth (e2e)', () => {
  const configService = {
    getOrThrow: jest.fn((key: string) => {
      if (key === 'bcrypt.saltOrRounds') {
        return 10;
      }

      const secret = 'secret';

      if (key === 'jwt') {
        return {
          secret,
        };
      }

      if (key === 'jwt.secret') {
        return secret;
      }
    }),
  };

  const prismaService = {
    user: {
      create: jest.fn(({ data }: Prisma.UserCreateArgs) => ({
        ...data,
        id: 1,
      })),
    },
  };

  const testingModuleBuilder = Test.createTestingModule({
    imports: [AuthModule],
  })
    .overrideProvider(ConfigService)
    .useValue(configService)
    .overrideProvider(PrismaService)
    .useValue(prismaService);

  describe('POST /auth/register', () => {
    it('should register a user and return it with a token', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const app = testingModule.createNestApplication();

      await app.init();

      const httpServer = app.getHttpServer();

      const user = {
        email: 'leone@abbacch.io',
        password: '39vH925964@',
      };

      await request(httpServer)
        .post('/auth/register')
        .send(user)
        .expect(HttpStatus.CREATED)
        .expect({
          ...user,
          id: 1,
        });

      await app.close();
    });
  });
});
