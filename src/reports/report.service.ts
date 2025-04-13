import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Raw } from 'typeorm';
import { Service } from '../../libs/entities/service.entity';
import { FuelLoad } from '../../libs/entities/fuel-load.entity';
import { Vehicle } from '../../libs/entities/vehicle.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,

    @InjectRepository(FuelLoad)
    private fuelRepo: Repository<FuelLoad>,

    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,

    private readonly dataSource: DataSource,
  ) {}

  async getHistorialServiciosPorVehiculo(
    vehicleId: number,
    startDate: string,
    endDate: string,
  ) {
    const servicios = await this.serviceRepo.find({
      where: {
        vehicle: { id: vehicleId },
        date: Between(new Date(startDate), new Date(endDate)),
      },
      relations: ['vehicle', 'provider', 'items'],
      order: { date: 'ASC' },
    });

    return servicios.map((s) => ({
      id: s.id,
      date: s.date,
      type: s.type,
      performedBy: s.performedBy,
      provider: s.provider ? s.provider.name : '',
      mileage: s.mileage,
      cost: s.cost || 0,
      itemsCount: s.items?.length || 0,
    }));
  }

  async getServiciosPorProveedor(startDate: string, endDate: string) {
    return this.dataSource.query(
      `SELECT 
        p.id AS providerId,
        p.name AS providerName,
        COUNT(s.id) AS totalServices,
        GROUP_CONCAT(DISTINCT v.name SEPARATOR ', ') AS vehicles,
        SUM(s.cost) AS totalSpent
      FROM service s
      LEFT JOIN provider p ON s.providerId = p.id
      LEFT JOIN vehicle v ON s.vehicleId = v.id
      WHERE s.date BETWEEN ? AND ?
      GROUP BY p.id, p.name
      ORDER BY totalSpent DESC`,
      [startDate, endDate],
    );
  }

  async getCostoAcumuladoPorVehiculo(startDate: string, endDate: string) {
    return this.dataSource.query(
      `SELECT 
        v.id AS vehicleId,
        v.name AS vehicleName,
        v.plate,
        COUNT(s.id) AS totalServices,
        SUM(s.cost) AS totalSpent
      FROM service s
      LEFT JOIN vehicle v ON s.vehicleId = v.id
      WHERE s.date BETWEEN ? AND ?
      GROUP BY v.id, v.name, v.plate
      ORDER BY totalSpent DESC`,
      [startDate, endDate],
    );
  }

  async getResumenMensualPorVehiculo(vehicleId: number, month: string) {
    const [year, monthNumber] = month.split('-').map(Number);
    const startDate = new Date(year, monthNumber - 1, 1);
    const endDate = new Date(year, monthNumber, 0, 23, 59, 59);

    return this.dataSource.query(
      `SELECT 
        s.id, s.date, s.type, s.mileage, s.cost,
        p.name AS provider
      FROM service s
      LEFT JOIN provider p ON p.id = s.providerId
      WHERE s.vehicleId = ? AND s.date BETWEEN ? AND ?
      ORDER BY s.date ASC`,
      [vehicleId, startDate, endDate],
    );
  }

  async getHistorialCombustiblePorVehiculo(
    vehicleId: number,
    startDate: string,
    endDate: string,
  ) {
    return this.dataSource.query(
      `SELECT 
        f.id, 
        f.date, 
        f.liters, 
        f.totalPrice AS total, 
        p.name AS provider
      FROM fuel_load f
      LEFT JOIN provider p ON f.providerId = p.id
      WHERE f.vehicleId = ? AND f.date BETWEEN ? AND ?
      ORDER BY f.date ASC`,
      [vehicleId, startDate, endDate],
    );
  }

  async getResumenMensualCombustible(mes: string) {
    return this.dataSource.query(
      `SELECT 
        v.id AS vehicleId,
        v.name AS vehicleName,
        SUM(f.liters) AS totalLiters,
        SUM(f.totalPrice) AS totalSpent
      FROM fuel_load f
      LEFT JOIN vehicle v ON f.vehicleId = v.id
      WHERE DATE_FORMAT(f.date, '%Y-%m') = ?
      GROUP BY v.id, v.name
      ORDER BY totalSpent DESC`,
      [mes],
    );
  }

  async getPromedioPrecioPorLitro(startDate: string, endDate: string) {
    return this.dataSource.query(
      `SELECT 
        v.id AS vehicleId,
        v.name AS vehicleName,
        SUM(f.totalPrice) AS totalSpent,
        SUM(f.liters) AS totalLiters,
        (SUM(f.totalPrice) / NULLIF(SUM(f.liters), 0)) AS averagePricePerLiter
      FROM fuel_load f
      INNER JOIN vehicle v ON f.vehicleId = v.id
      WHERE f.date BETWEEN ? AND ?
      GROUP BY v.id, v.name
      ORDER BY averagePricePerLiter DESC`,
      [startDate, endDate],
    );
  }

  async getResumenMensualTotal(month: string) {
    return this.dataSource.query(
      `SELECT
        'Servicios' AS category,
        SUM(s.cost) AS total
      FROM service s
      WHERE DATE_FORMAT(s.date, '%Y-%m') = ?
      UNION
      SELECT
        'Combustible' AS category,
        SUM(f.totalPrice) AS total
      FROM fuel_load f
      WHERE DATE_FORMAT(f.date, '%Y-%m') = ?`,
      [month, month],
    );
  }
}
