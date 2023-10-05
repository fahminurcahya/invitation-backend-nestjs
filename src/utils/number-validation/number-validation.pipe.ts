import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NumberValidationPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const roleId = parseInt(value, 10);

    if (isNaN(roleId)) {
      throw new BadRequestException(`Invalid input: '${value}' is not a number`);
    }

    return roleId;
  }
}
