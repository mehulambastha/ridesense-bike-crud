import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

// Custom global exception filter. This is used to parse errors in a graceful manner
// Catches all unhandled errors in this whole RideSense task bakckend.
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR; // This is done so that the errors which are not httpExceptions are also handled, becasue these are then given status 500 for internal servor error.

    // Extract the response from the exception
    const exceptionResponse = exception instanceof HttpException
      ? exception.getResponse()
      : { message: 'Internal server error' };

    let message: string | object = 'An error occurred';
    let errors: any[] = [];

    // Handle both string and object types for exception responses
    // Custom formatting of the error object is done here to ensure readable response.
    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const responseObj = exceptionResponse as any;
      message = responseObj.message || 'An error occurred';
      errors = responseObj.errors || [];
    }

    // This I have done to ensure consistent error response structure. The error specific data and messages are inside the 'messages' object. For eg. it could be somethign like error.message.messages.
    response.status(status).json({
      statusCode: status,
      message: message,
      errors: errors,
    });
  }
}

