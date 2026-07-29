import { Type } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";


class GeoJsonPointDto {
@IsString()
@IsNotEmpty()
type! : 'Point';

@IsArray()
@IsNotEmpty()
@IsNumber({}, { each: true})
@ArrayMinSize(2)
@ArrayMaxSize(2)
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