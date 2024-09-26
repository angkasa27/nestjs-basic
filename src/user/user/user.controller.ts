import {
  Controller,
  Get,
  Header,
  HttpCode,
  HttpRedirectResponse,
  Post,
  Query,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

// ** generated from  nest generate controller [name] [path api]

@Controller('/api/users')
export class UserController {
  @Post()
  post(): string {
    return 'POST /api/users';
  }

  @Get()
  get(): string {
    return 'GET /api/users';
  }

  // * example using express response but not recommended
  @Get('/express-response')
  expressResponse(@Res() response: Response) {
    response.status(200).send('Sample Response');
  }

  // * example response recommended way
  @Get('/recommended-response')
  @Header('Content-Type', 'application/json')
  @HttpCode(201)
  recommendedResponse(): Record<string, string> {
    return {
      message: 'Sample Response',
    };
  }

  // * Redirect to another URL
  @Get('/redirect')
  // * You can add directly to the decorator, but it will not be dynamic
  @Redirect()
  redirect(): HttpRedirectResponse {
    return {
      statusCode: 301,
      url: 'https://nestjs.com',
    };
  }

  // * This will get all requests that match /api/users/:id using express request
  // @Get('/:id')
  // getById(@Req() request: Request): string {
  //   return `GET ${request.params.id}`;
  // }

  // * if only need the query, use @Query instead of @Req
  //  * if need multiple queries or params, just pass them in
  @Get('/hello')
  // * async method example
  async sayHello(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ): Promise<string> {
    return `Hello ${firstName} ${lastName}`;
  }

  // * if only need the id, use @Param instead of @Req
  // @Get('/:id')
  // getById(@Param('id') id: string): string {
  //   return `GET ${id}`;
  // }

  // * Set cookie via express response
  @Get('/set-cookie')
  setCookie(@Query('name') name: string, @Res() response: Response) {
    response.cookie('name', name);
    response.status(200).send('Success Set Cookie');
  }

  // * Get cookie via express request
  @Get('/get-cookie')
  getCookie(@Req() request: Request): string {
    return request.cookies['name'];
  }

  // * Render template / view mustache
  @Get('/view/hello')
  viewHello(@Query('name') name: string, @Res() response: Response) {
    response.render('index.html', { title: 'Template Engine', name });
  }
}
