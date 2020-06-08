import { 
    SecurityService,
    Session,
    WsAuthService,
    Application
} from '@piros/tssf';

import { Injector } from '@piros/ioc';

import { Observable, of, throwError } from 'rxjs';
import * as uuid from 'uuid';
import { TestController } from './example/test-controller';

class MySecurityService extends SecurityService {

    public canMakeRequest(session: Session, requestType: string): boolean {
        if (requestType === 'unauthorized-request') {
            return false;
        }
        return true;
    }
}

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
    { provide: WsAuthService, useClass: MyAuthService },
    { provide: SecurityService, useClass: MySecurityService }
]);

new Application({
    controllers: [
        TestController
    ],
    channels: [
        'valid-channel',
        'users-channel',
    ]
}, injector).start(3001);