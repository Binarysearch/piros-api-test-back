import { Application } from './application/application';
import { TestController } from './example/test-controller';
import { WsAuthService } from './controller/ws-auth-service';
import { Observable, of, throwError } from 'rxjs';

import { Injector } from '@piros/ioc';

export { Controller, Request as Post } from './controller/controller';

import * as uuid from 'uuid';
import { Session } from './controller/interfaces/session';

class MyAuthService extends WsAuthService {

    public authWithToken(authToken: string): Observable<Session> {
        if (authToken === '12345') {
            return of({
                id: uuid.v4(),
                authToken: authToken,
                user: 2
            });
        } else {
            return throwError('Invalid token');
        }
    }
    
    public login(username: string, password: string, authToken: string): Observable<Session> {
        if (username === 'admin' && password === '12345') {
            return of({
                id: uuid.v4(),
                authToken: authToken,
                user: 2
            });
        } else {
            return throwError('Invalid token');
        }
    }
    
}

const injector = new Injector();

injector.setProviders([
    { provide: WsAuthService, useClass: MyAuthService }
]);

new Application({
    controllers: [
        TestController
    ],
    channels: [
        'valid-channel'
    ]
}, injector).start(3002);