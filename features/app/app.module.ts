import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ItemModule } from './item';
import { UploadModule } from './upload/upload.module';
import { PrimitiveModule } from './primitive';
import { GqlErrorFormatter } from './utils';
import environment from './environment';

@Module({
  imports: [
    ItemModule,
    UploadModule,
    PrimitiveModule,
    MongooseModule.forRoot(environment.mongodb),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: './features/app/schema.gql',
      playground: false,
      installSubscriptionHandlers: true,
      path: '/graphql',
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: GqlErrorFormatter.formatError,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
