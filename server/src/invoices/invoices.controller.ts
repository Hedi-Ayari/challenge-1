
import { Controller, Get, Param, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateInvoiceStatusDto } from './dto/update-invoice-status.dto';

@ApiTags('invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all invoices for the user.' })
  async findAll(@Request() req) {
    return this.invoicesService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get invoice by ID.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.invoicesService.findOne(id, req.user.userId);
  }

  @Patch(':id/status')
  @ApiResponse({ status: 200, description: 'Update invoice status.' })
  @ApiResponse({ status: 404, description: 'Invoice not found.' })
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateInvoiceStatusDto,
    @Request() req
  ) {
    return this.invoicesService.updateStatus(id, req.user.userId, updateStatusDto.paid);
  }
}
