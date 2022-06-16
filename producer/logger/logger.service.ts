import { Injectable, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';


@Injectable()
export class LogService {
    constructor(
        @Inject(REQUEST) public request: Request, // currently first call request will make kafka stuck and get 1 message only
    ) {}

    getRequest() {
        return `request headers::: ${JSON.stringify(this.request.headers)}`
    }
}