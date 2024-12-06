import { DataDto } from "./data-dto";

export class ResultDataDto {
  count: number = 0;
  page: number = 0;
  items: DataDto[] = [];
}
