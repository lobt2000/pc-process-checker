import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(processes: any[], value: string): any[] {
    const filterArray = processes ?? [];

    return value
      ? processes.filter((res) => res.name.includes(value))
      : processes;
  }
}
