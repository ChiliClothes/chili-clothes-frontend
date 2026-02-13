import { HttpInterceptorFn } from '@angular/common/http';

export const productsInterceptor : HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token'); // O de donde saques tu token

  if (req.url.includes('/api/Products')) {
    
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authReq);
  }

  return next(req);
};