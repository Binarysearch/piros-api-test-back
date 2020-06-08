import { Controller, Request, NotificationService, Session, Post } from "@piros/tssf";
import { Observable, of, throwError } from "rxjs";


@Controller
export class TestController {

    constructor(
        private notification: NotificationService
    ) {}

    @Request('unauthorized-request')
    public unauthorized(session: Session, body: string): Observable<string> {
        return of(body + '-1');
    }

    @Request('echo-message')
    public echo(session: Session, body: string): Observable<string> {
        return of(body + '-1');
    }

    @Post('test-post-echo')
    public echoPost(body: { text: string }): Observable<string> {
        return of(body.text + '-1');
    }

    @Request('delayed-echo-message')
    public echo2(session: Session, body: string): Observable<string> {
        return new Observable(obs=>{
            setTimeout(() => {
                obs.next(body + '-1');
                obs.complete();
            }, 2000);
        });
    }
    
    @Request('send-something-for-valid-channel')
    public send(session: Session, body: string): Observable<string> {
        this.notification.sendNotification('valid-channel', 'hola');
        return of(body + '-1');
    }

    @Request('get-fruits')
    public getFruits(session: Session, body: string): Observable<string> {
        return of('fruits');
    }

    @Request('return-error-request')
    public returnErrorRequest(session: Session, body: string): Observable<string> {
        return throwError('some error');
    }
    
}