import { Injectable, NestMiddleware,BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TestMiddleware implements NestMiddleware {
    constructor(
    ) { }

    use(req: Request, res: Response, next: NextFunction) {
        this.test()
        next();
    }

    test() {
        throw new BadRequestException;
    }
}