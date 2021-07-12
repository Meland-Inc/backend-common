import { Injectable, ExecutionContext, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Injectable()
export class GqlAuthGuard extends JwtAuthGuard {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req: Request = ctx.getContext().req;
        return req;
    }
}

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const ctx = GqlExecutionContext.create(context);
        const req: Request = ctx.getContext().req;
        return req.user;
    },
);