import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

type HttpExceptionResponse = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const isHttpException = exception instanceof HttpException;

    const status = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const rawResponse = isHttpException
      ? exception.getResponse()
      : 'Internal server error';

    let message: string | string[] = 'Internal server error';
    let error: string | undefined;

    if (typeof rawResponse === 'string') {
      message = rawResponse;
    } else if (typeof rawResponse === 'object' && rawResponse !== null) {
      const res = rawResponse as HttpExceptionResponse;

      message = res.message ?? message;
      error = res.error;
    }

    return response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}
