import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ItemModule } from './item';
import { UploadModule } from './upload/upload.module';
import { PrimitiveModule } from './primitive';
import { GqlErrorFormatter } from './utils';

@Module({
  imports: [
    ItemModule,
    UploadModule,
    PrimitiveModule,
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
