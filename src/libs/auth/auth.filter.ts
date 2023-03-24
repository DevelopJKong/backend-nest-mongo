import { ArgumentsHost, HttpException, HttpStatus, Catch, Inject } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { I_SERVICE } from '../../common/constants/interface.constants';
import { ILoggerService } from '../logger/interfaces/logger-service.interface';

@Catch(ForbiddenException)
export class AuthForbiddenException extends HttpException {
  constructor(@Inject(I_SERVICE.I_LOGGER_SERVICE) private readonly log: ILoggerService) {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = (exception as HttpException)?.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
    this.log.logger().error(`${this.log.loggerInfo(exception.message)}`);
    request['user'] = null;
  }
}
