import { envShared } from './environment.shared';

export const environment = {
    ...envShared,
    API: {
        main: 'http://localhost:8080/api/',
        auth: 'http://localhost:8080/auth/',
    }
};