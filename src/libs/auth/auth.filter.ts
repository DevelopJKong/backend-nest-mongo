import { ArgumentsHost, HttpException, HttpStatus, Catch } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Catch(ForbiddenException)
export class AuthForbiddenException extends HttpException {
  constructor(private readonly log: LoggerService) {
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
