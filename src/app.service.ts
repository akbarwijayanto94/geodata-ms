import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHome(): string {
    return 'Hi! Welcome to GeoData Management System'
  }
}
