import { CanActivateFn } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
  console.log(route);
  console.log(state);
  return true;
};
