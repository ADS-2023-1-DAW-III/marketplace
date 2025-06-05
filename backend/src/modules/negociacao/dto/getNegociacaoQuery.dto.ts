import { IsBoolean, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

export class GetNegociacaoQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsBoolean()
  recentes?: boolean;
}
