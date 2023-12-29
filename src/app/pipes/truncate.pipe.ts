import {Pipe, PipeTransform} from '@angular/core';
import {BaseComponent} from "../base/base.component";

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe extends BaseComponent implements PipeTransform {
  transform(input: string | undefined, limit: number): string {
    const str = input as string;
    const tail = str.length <= limit ? '' : '...';
    return str.slice(0, limit) + tail;
  }
}
