var log4js = require('log4js');

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            type: 'dateFile',
            filename: 'logs/log',
            pattern: "_yyyy-MM-dd hh",
            maxLogSize: 1024,
            alwaysIncludePattern: true,
            backups: 4,
            category: 'logger'
        }
    ],
    replaceConsole: false
});

module.exports = log4js.getLogger('logger');

/**
 * Created by liuchi on 15/11/23.
 */
