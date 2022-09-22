// replace logger
import { Logger } from 'tslog';

/* istanbul ignore next */
const env = process.env.NODE_ENV || 'development';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const logger = new Logger({
    name: 'console',
    overwriteConsole: true,
    minLevel: /* istanbul ignore next */  env === 'development' ? 'silly' : 'info',
    dateTimeTimezone: timezone
});