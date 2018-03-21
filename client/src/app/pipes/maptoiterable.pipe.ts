import { Pipe, PipeTransform } from '@angular/core';

/*
 * Iterate over a map or JSON object
 * Usage:
 *
 *  map | mapToIterable[:keyval|key|val]
 *
 * Example:
 *
 * map = {
 *     'a': 'aee',
 *     'b': 'bee',
 *     'c': 'see'
 * }
 *
 * <div *ngFor="let o of map | mapToIterable">{{o.key}}: {{o.value}}</div>
 *   <div>a: aee</div>
 *   <div>b: bee</div>
 *   <div>c: see</div>
 *
 * <div *ngFor="let o of map | mapToIterable:'keyval'">{{o.key}}: {{o.value}}</div>
 *   <div>a: aee</div>
 *   <div>b: bee</div>
 *   <div>c: see</div>
 *
 * <div *ngFor="let k of map | mapToIterable:'key'">{{k}}</div>
 *   <div>a</div>
 *   <div>b</div>
 *   <div>c</div>
 *
 * <div *ngFor="let v of map | mapToIterable:'value'">{{v}}</div>
 *   <div>aee</div>
 *   <div>bee</div>
 *   <div>see</div>
 *   value | exponentialStrength:exponent
*/

type Args = 'keyval'|'key'|'value';

@Pipe({
  name: 'mapToIterable',
  pure: false
})
export class MapToIterablePipe implements PipeTransform {
  transform(obj: {}, arg: Args = 'keyval') {
    if (!obj) {
      return undefined;
    }

    return arg === 'keyval' ?
        Object.keys(obj).map(key => ({key: key, value: obj[key]})) :
      arg === 'key' ?
        Object.keys(obj) :
      arg === 'value' ?
        Object.keys(obj).map(key => obj[key]) :
      null;
  }
}
