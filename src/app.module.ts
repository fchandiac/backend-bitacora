import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesService } from './vehicles/vehicles.service';
import { ServiceController } from './services/services.controller';
import { ServiceService } from './services/services.service';
import { ProvidersController } from './providers/providers.controller';
import { ProvidersService } from './providers/providers.service';
import { ItemsController } from './items/items.controller';
import { ItemsService } from './items/items.service';
import { FuelLoadController} from './fuel-loads/fuel-loads.controller';
import { FuelLoadService} from './fuel-loads/fuel-loads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'libs/entities/user.entity';
import { Vehicle } from 'libs/entities/vehicle.entity';
import { Provider } from 'libs/entities/provider.entity';
import { Service } from 'libs/entities/service.entity';
import { Item } from 'libs/entities/item.entity';
import { FuelLoad } from 'libs/entities/fuel-load.entity';
import { ReportController } from './reports/report.controller';
import { ReportService } from './reports/report.service';
import { envs } from 'libs/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // o mysql, sqlite, etc.
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.user,
      password: envs.database.password,
      database: envs.database.DatabaseName,
      entities: [User, Vehicle, Provider, Service, Item, FuelLoad],
      synchronize: false, // ⚠️ solo para desarrollo
    }),
    TypeOrmModule.forFeature([User, Vehicle, Provider, Service, Item, FuelLoad]),
  ],
  controllers: [
    AuthController,
    UsersController,
    VehiclesController,
    ServiceController,
    ProvidersController,
    ItemsController,
    FuelLoadController,
    ReportController,
  ],
  providers: [
    AuthService,
    UsersService,
    VehiclesService,
    ServiceService,
    ProvidersService,
    ItemsService,
    FuelLoadService,
    ReportService,
  ],
})
export class AppModule {}
