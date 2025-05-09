import { Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash-es';

@Pipe({
  name: 'displayUserData',
  standalone: true
})
export class DisplayUserDataPipe implements PipeTransform {
  transform(user: any, field: string): any {
    if (!user || !field) return '';

    switch (field) {
      case 'fullname':
        const first = user.firstname ?? '';
        const last = user.lastname ?? '';
        return `${first} ${last}`.trim();

      case 'gender':
        const g = user.gender ?? '';
        return g.charAt(0).toUpperCase() + g.slice(1).toLowerCase();

      case 'age':
        const age = user.age;
        return typeof age === 'number' && !isNaN(age) ? age : 'N/A';

      case 'createdAt':
      case 'updatedAt':
        return user[field] ? new Date(user[field]) : null;

      default:
        return get(user, field, '');
    }
  }
}
