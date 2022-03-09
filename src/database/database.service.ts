import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Configuration } from '../config/config.keys';

// para el caso de conexion a diferentes BD
export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule], // para credenciales desde las ENVs
    inject: [ConfigService], //para entregar credenciales a la BD
    async useFactory(config: ConfigService) { // creao objeto de conexion
      return {
        ssl: true,
        // type: 'postgres' as 'postgres',
        type: 'postgres',
        host: config.get(Configuration.HOST),
        username: config.get(Configuration.USERNAME),
        password: config.get(Configuration.PASSWORD),
        entities: [config.get(Configuration.TYPEORM_ENTITIES)], // [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [config.get(Configuration.TYPEORM_MIGRATION_DIR)], // [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
