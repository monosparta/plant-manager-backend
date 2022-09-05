// replace logger
import { Logger } from 'tslog';

const env = process.env.NODE_ENV || 'development';

export const logger = new Logger({
    name: 'console',
    overwriteConsole: true,
    minLevel: env === 'development' ? 'silly' : 'info'
});