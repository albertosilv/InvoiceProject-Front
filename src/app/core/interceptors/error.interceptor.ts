import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro inesperado';

        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 404) {
          errorMessage = 'Recurso não encontrado';
        } else if (error.status === 403) {
          errorMessage = 'Acesso não autorizado';
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
        });

        return throwError(() => error);
      })
    );
  }
}
