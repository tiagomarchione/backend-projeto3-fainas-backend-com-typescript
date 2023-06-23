import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "./decorators/public-endpoint";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService : JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context : ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if(isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        
        try {
            if(request.headers['authorization'] === undefined) {
                throw new UnauthorizedException();
            }
            const [type, token] = request.headers['authorization'].split(' ');
            if(type !== 'Bearer') {
            throw new UnauthorizedException();
            }
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        
        return true;
    }
}