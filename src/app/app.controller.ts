import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {

    // tslint:disable-next-line: no-empty
    constructor() {}

    @Get('hello')
    getData(): string {
        return 'Hello';
    }

}
