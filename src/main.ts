import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configurar body parser com limite maior (200MB para JSON e URL encoded)
  // IMPORTANTE: Não processar multipart/form-data aqui, deixar para o Multer
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.is('multipart/form-data')) {
      return next();
    }
    express.json({ limit: '200mb' })(req, res, next);
  });

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.is('multipart/form-data')) {
      return next();
    }
    express.urlencoded({ limit: '200mb', extended: true })(req, res, next);
  });

  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.is('multipart/form-data')) {
      return next();
    }
    express.raw({ limit: '200mb' })(req, res, next);
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads',
    setHeaders: (res) => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  });

  await app.listen(3008);
}
bootstrap();
