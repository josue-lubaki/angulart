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

    // age exact in years, months and days
    return today.getFullYear() - birthDate.getFullYear() - (today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);
  }
}
