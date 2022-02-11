import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: Date | undefined): number | null {
    if (!value) {
      return null;
    }

    const today = new Date();
    const birthDate = new Date(value);
    return today.getFullYear() - birthDate.getFullYear();
  }
}
