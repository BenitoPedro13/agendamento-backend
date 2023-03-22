import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PatientModule } from './models/patient/patient.module';
import { PsychologistModule } from './models/psychologist/psychologist.module';
import { AppointmentModule } from './models/appointment/appointment.module';
// import ormConfig from '../ormconfig.json';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'babar.db.elephantsql.com',
      port: 5432,
      username: 'negwqbjn',
      password: '33c5KEoO6Lz6xeOmXA44c50D8SZosxJk',
      database: 'negwqbjn',
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      // playground: true,
      // definitions: {
      //   path: join(process.cwd(), 'dist/graphql.ts'),
      //   outputAs: 'class',
      // },
    }),
    PatientModule,
    PsychologistModule,
    AppointmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
