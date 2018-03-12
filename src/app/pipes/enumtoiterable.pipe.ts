import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToIterable',
  pure: false
})
export class EnumToIterablePipe implements PipeTransform {
  transform(value, args:string[]) : any {
    if (!value) {
      return undefined;
    }
    let keys = [];
    for (var enumMember in value) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        keys.push({key: enumMember, value: value[enumMember]});
        // Uncomment if you want log
        // console.log("enum member: ", value[enumMember]);
      }
    }
    return keys;
  }
}
