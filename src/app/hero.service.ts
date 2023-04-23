import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'https://gateway.marvel.com:443/v1/public/characters';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient
  ) { }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any>(`${this.heroesUrl}?nameStartsWith=${term}&apikey=3c1408a141888ce6a049a602361247d2`).pipe(
      catchError(this.handleError<any[]>('searchHeroes', [])),
      map((response) => {
        // Modify response here
        return response.data.results
      })
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
}
