import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JsonParser, JsonStringifier } from 'jackson-js';
import { Writer } from '../models/writer.model';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  constructor(private http: HttpClient) { }

  getAllPublic(): Observable<Array<Writer>> {
    const jsonParser = new JsonParser();

    return this.http.get<Array<Writer>>('http://localhost:8000/writers/public').pipe(
      map(response => {
        return jsonParser.transform(response, {
          mainCreator: () => [Array, [Writer]]
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getAll(): Observable<Array<Writer>> {
    const jsonParser = new JsonParser();

    return this.http.get<Array<Writer>>('http://localhost:8000/writers').pipe(
      map(response => {
        return jsonParser.transform(response, {
          mainCreator: () => [Array, [Writer]]
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  add(writer: Writer): Observable<Writer> {
    const jsonParser = new JsonParser();
    const jsonStringifier = new JsonStringifier();

    return this.http.post<Writer>('http://localhost:8000/writers', jsonStringifier.transform(writer, {
      mainCreator: () => [Writer]
    })).pipe(
      map(response => {
        return jsonParser.transform(response, {
          mainCreator: () => [Writer]
        });
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
