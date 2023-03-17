import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { createMock } from '@golevelup/ts-jest';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  const testingModuleBuilder = Test.createTestingModule({
    providers: [AuthService],
  });

  testingModuleBuilder.useMocker(createMock);

  describe('The register method', () => {
    it('should return a token', async () => {
      const testingModule = await testingModuleBuilder.compile();
      const authService = testingModule.get(AuthService);
      const jwtService = testingModule.get(JwtService);
      const expectedToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwibmFtZSI6Ikxlb25lIEFiYmFjY2hpbyIsImlhdCI6MTUxNjIzOTAyMn0.aD47yCtALy6y4S6plNfB5JuwC4yj7u22_PuYdva5GiQ';

      jest.spyOn(jwtService, 'sign').mockImplementation(() => expectedToken);

      const credentials = {
        email: 'leone@abbacch.io',
        password: '5482J9$01l5',
      };

      const token = await authService.register(credentials);

      expect(token).toBe(expectedToken);
    });
  });
});
