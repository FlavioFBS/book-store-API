import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      // cargar variables de entorno
      const envFilePath = __dirname + '/../../.env';
      const exitsPath = fs.existsSync(envFilePath);

      if (!exitsPath) {
        console.log('.env file no existe');
        process.exit(0);
      }

      // leer el archivo y pasarlo a un objeto
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
