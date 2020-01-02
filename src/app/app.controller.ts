import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {

    // tslint:disable-next-line: no-empty
    constructor() {}

    @Get('')
    getData(): string {
        return 'Hello';
    }

}
