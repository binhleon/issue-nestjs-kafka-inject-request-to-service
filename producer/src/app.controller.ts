import {Controller, Get, Inject, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { AppService } from './app.service';
import { LogService } from '../logger/logger.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy{
  constructor(
    private readonly appService: AppService,
    private readonly logger: LogService,
    @Inject('any_name_i_want') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    ['medium.rocks'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('kafka-test')
  testKafka(){
    this.client.emit('medium.rocks', {foo:'bar', data: new Date().toString()})
    this.client.emit('medium.rocks', {foo:'bar', data: new Date().toString()})
    this.client.emit('medium.rocks', {foo:'bar', data: new Date().toString()})
    return 
  }


  @Get('kafka-test-with-response')
  testKafkaWithResponse(){
    // this.logger.getRequest();
    return this.client.send('medium.rocks', {foo:'bar', data: new Date().toString()})
  }


}
