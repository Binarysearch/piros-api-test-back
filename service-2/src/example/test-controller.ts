import { Controller, Request, Post } from "../controller/controller";
import { Observable, of, throwError } from "rxjs";
import { NotificationService } from "../controller/notification-service";
import { Session } from "../controller/interfaces/session";


@Controller
export class TestController {

    constructor(
        private notification: NotificationService
    ) {}

    @Request('echo-message')
    public echo(session: Session, body: string): Observable<string> {
        return of(body + '-2');
    }

    @Post('test-post-echo')
    public echoPost(body: string): Observable<string> {
        return of(body + '-2');
    }

    @Request('send-something-for-valid-channel')
    public send(session: Session, body: string): Observable<string> {
        this.notification.sendNotification('valid-channel', 'hola');
        return of(body + '-2');
    }

    @Request('get-animals')
    public getFruits(session: Session, body: string): Observable<string> {
        return of('animals');
    }

    @Request('return-error-request')
    public returnErrorRequest(session: Session, body: string): Observable<string> {
        return throwError('some error');
    }
    
}