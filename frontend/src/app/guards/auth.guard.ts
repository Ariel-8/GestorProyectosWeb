import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    // Redirige a login si no hay token
    window.location.href = '/login';
    return false;
  }
};