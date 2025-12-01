import { transports, format } from 'winston';

export const loggerConfig = {
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'HH:mm:ss' }),
        format.printf(({ level, message, timestamp, context }) => {
          return `[${String(timestamp)}] ${String(level)} ${typeof context === 'string' ? context : 'App'}: ${String(message)}`;
        }),
      ),
    }),
  ],
};
