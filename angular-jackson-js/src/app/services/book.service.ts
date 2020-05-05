import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JsonParser, JsonStringifier } from 'jackson-js';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllPublic(): Observable<Array<Book>> {
    const jsonParser = new JsonParser();

    return this.http.get<Array<Book>>('http://localhost:8000/books/public').pipe(
      map(response => {
        return jsonParser.transform(response, {
          mainCreator: () => [Array, [Book]]
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  getAll(): Observable<Array<Book>> {
    const jsonParser = new JsonParser();

    return this.http.get<Array<Book>>('http://localhost:8000/books').pipe(
      map(response => {
        return jsonParser.transform(response, {
          mainCreator: () => [Array, [Book]]
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  add(book: Book): Observable<Book> {
    const jsonParser = new JsonParser();
    const jsonStringifier = new JsonStringifier();

    return this.http.post<Book>('http://localhost:8000/books', jsonStringifier.transform(book, {
      mainCreator: () => [Book]
    })).pipe(
      map(response => {
        return jsonParser.transform(response, {
          mainCreator: () => [Book]
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
