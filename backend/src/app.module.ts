import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Auth } from './entity/auth.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VideoModule } from './video/video.module';
import { CaslModule } from './casl/casl.module';
import { logger } from './middleware/logger.middleware';
import { VideoController } from './video/video.controller';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Auth],
      //Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    VideoModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      // .exclude(
      //   { path: 'video', method: RequestMethod.GET },
      //   { path: 'video', method: RequestMethod.POST },
      //   'video/{*splat}',
      // )
      .forRoutes(VideoController);
  }
}
