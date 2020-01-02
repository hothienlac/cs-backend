// import * as csurf from 'csurf';
import * as helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    // TODO: enable csurf
    // As explained on the csurf middleware page https://github.com/expressjs/csurf#csurf,
    // the csurf module requires either a session middleware or cookie-parser to be initialized first.
    // app.use(csurf());

    app.use(helmet());

    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.port || 3000;
    await app.listen(port, () => {
        // tslint:disable-next-line: no-console
        console.log(
            'Listening at http://localhost:' + port + '/' + globalPrefix,
        );
    });
}

bootstrap();
