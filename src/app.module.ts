import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { dataSourceOptions } from './db/data-source'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).exclude('/').forRoutes('*')
  }
}
