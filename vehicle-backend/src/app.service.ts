import { Injectable } from '@nestjs/common';
import {Pool}  from 'pg';

interface VEHICLE {
  make: string;
  model: string;
  year: number;
}


@Injectable()
export  class VehicleService {
  private pool = new Pool({
    user:"postgres",
    host:"localhost",
    password:"root",
    database:"vehicle_log_db",
    port:5433
  });

  async getData(){
    const response = await this.pool.query("SELECT * FROM vehicle")
    return response.rows;
  }

  async createData(vehicle :VEHICLE) {
    const {make,model,year} = vehicle;

    const query = `
    INSERT INTO vehicle (make, model, year)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
    const value = [make, model, year]
    
    const response = await this.pool.query(query, value)
    return response.rows;                           
  }
}
