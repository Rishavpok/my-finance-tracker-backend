import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { BaseService } from './BaseService';

export class BaseController {
    
    constructor(public service : BaseService) {

    }

    @Get('all') 
    async getTransactions(@Req() req: any  ) {
       return this.service.getAll(req.user.userId)
    }

}
