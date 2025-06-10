
import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceStatusDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  paid: boolean;
}
