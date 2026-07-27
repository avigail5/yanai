import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";


class GeoJsonPointDto {
@IsString()
@IsNotEmpty()
type! : 'Point';

@IsArray()
@IsNotEmpty()
@IsNumber({}, { each: true})
@ArrayMinSize(2)
@ArrayMinSize(3)
coordinates!: number[];
}

export class CreateTaskDto {
  @IsString()
  title!: string;

  @IsOptional()
  description?: string;

  @ValidateNested()
  @Type(() => GeoJsonPointDto)
  @IsObject()
  location!: GeoJsonPointDto;
}