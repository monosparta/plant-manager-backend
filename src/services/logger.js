// replace logger
import { Logger } from 'tslog';

const env = process.env.NODE_ENV || 'development';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const logger = new Logger({
    name: 'console',
    overwriteConsole: true,
    minLevel: env === 'development' ? 'silly' : 'info',
    dateTimeTimezone: timezone
});