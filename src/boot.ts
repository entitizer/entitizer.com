
export const i18n = require('i18n');
import * as path from 'path';

i18n.configure({
    locales: ['en'],
    directory: path.join(__dirname, '..', 'locales'),
    cookie: 'ul',
    queryParameter: 'ul'
});