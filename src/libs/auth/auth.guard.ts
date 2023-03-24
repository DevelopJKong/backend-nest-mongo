import { AllowedRoles } from './role.decorator';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { I_SERVICE } from '../../common/constants/interface.constants';
import { ILoggerService } from '../logger/interfaces/logger-service.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(I_SERVICE.I_LOGGER_SERVICE) private readonly log: ILoggerService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<AllowedRoles>('role', context.getHandler());
    const noRoleMessage = '권한이 없습니다.';
    const noUserData = '유저 데이터가 없습니다.';
    const successMessage = '권한 확인 성공';

    if (!roles) {
      this.log.logger().info(`${this.log.loggerInfo(noRoleMessage)}`);
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      this.log.logger().error(`${this.log.loggerInfo(noUserData)}`);
      return false;
    }

    this.log.logger().error(`${this.log.loggerInfo(successMessage)}`);
    return roles.includes(user.role);
  }
}
