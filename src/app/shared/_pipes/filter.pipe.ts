import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(arr: any, args?: any): any {

    if (!arr) return null;
    if (!args) return arr;

    args = args.toLowerCase();

    if (arr.some((user: { hasOwnProperty: (arg0: string) => any; }) => user.hasOwnProperty('password'))) {
      arr.forEach((object: { [x: string]: any; }) => {
        delete object['password'];
      });
    }

    return arr.filter(function (item: any) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

}
