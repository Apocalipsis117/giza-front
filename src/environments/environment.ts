import { envShared } from './environment.shared';

export const environment = {
    ...envShared,
    API: {
        main: 'https://traziall.ngrok.dev/api/',
        auth: 'https://traziall.ngrok.dev/auth/'
    }
};
