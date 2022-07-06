import { Injectable, CanActivate, ExecutionContext, OnModuleInit } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as OktaJwtVerifier from '@okta/jwt-verifier';

@Injectable()
export class OktaGuard implements CanActivate, OnModuleInit {

    oktaJwtVerifier: any;

    onModuleInit() {
        this.oktaJwtVerifier = new OktaJwtVerifier({
            issuer: process.env.OKTA_ISSUER,
            clientId: process.env.OKTA_CLIENTID
        });
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const token = context.getArgs()[0].headers.authorization.split(' ')[1];
        const audience = process.env.OKTA_AUDIENCE;

        return this.oktaJwtVerifier.verifyAccessToken(token, audience)
            .then(() => {
                return true;
            })
            .catch((err) => {
                console.log(err);
                return false;
            });
    }
}
