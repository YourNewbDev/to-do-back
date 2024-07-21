import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
//passport-local is used as the strategy for this which will trigger local.strategy.ts
export class LocalAuthGuard extends AuthGuard('local') {
    
}