import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { APP_PORT } from './common/config'
import { CustomValidationPipe } from './middleware/custom.validation.pipe'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new CustomValidationPipe())

  const config = new DocumentBuilder()
    .setTitle('Geo Data Management System Document')
    .setVersion('1.0')
    // .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(APP_PORT || 4000)
}
bootstrap()
