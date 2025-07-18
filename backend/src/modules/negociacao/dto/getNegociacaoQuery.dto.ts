import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class GetNegociacaoQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    type: 'boolean',
    description: 'Negociações recentes',
    required: false,
  })
  recentes?: boolean;
}
