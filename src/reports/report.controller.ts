import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('historial-servicios')
  async historialServiciosPorVehiculo(
    @Query('vehicleId', ParseIntPipe) vehicleId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!vehicleId || !startDate || !endDate) {
      return { error: 'Faltan parámetros requeridos' };
    }
    return this.reportService.getHistorialServiciosPorVehiculo(
      vehicleId,
      startDate,
      endDate,
    );
  }

  @Get('servicios-por-proveedor')
  async serviciosPorProveedor(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      return { error: 'Faltan parámetros requeridos' };
    }
    return this.reportService.getServiciosPorProveedor(startDate, endDate);
  }

  @Get('costo-vehiculo')
  async costoPorVehiculo(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) return { error: 'Faltan fechas' };
    return this.reportService.getCostoAcumuladoPorVehiculo(startDate, endDate);
  }

  @Get('resumen-mensual-por-vehiculo')
  async resumenMensualPorVehiculo(
    @Query('vehicleId', ParseIntPipe) vehicleId: number,
    @Query('month') month: string,
  ) {
    if (!vehicleId || !month) {
      return { error: 'Faltan parámetros requeridos' };
    }
    return this.reportService.getResumenMensualPorVehiculo(vehicleId, month);
  }
  @Get('historial-combustible')
  async historialCombustiblePorVehiculo(
    @Query('vehicleId', ParseIntPipe) vehicleId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!vehicleId || !startDate || !endDate) {
      return { error: 'Faltan parámetros requeridos' };
    }
    return this.reportService.getHistorialCombustiblePorVehiculo(
      vehicleId,
      startDate,
      endDate,
    );
  }

  @Get('resumen-mensual-combustible')
  async resumenMensualCombustible(@Query('month') month: string) {
    if (!month) return { error: 'Falta el mes' };
    return this.reportService.getResumenMensualCombustible(month);
  }
  @Get('promedio-litro')
  async promedioPrecioPorLitro(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    if (!startDate || !endDate) {
      return { error: 'Faltan parámetros requeridos' };
    }
    return this.reportService.getPromedioPrecioPorLitro(startDate, endDate);
  }
  @Get('resumen-mensual-total')
  async resumenMensualTotal(@Query('month') month: string) {
    if (!month) return { error: 'Mes requerido' };
    return this.reportService.getResumenMensualTotal(month);
  }
}
