import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Header {
  
  title = signal<string>('Dashboard Overview');

  setTitle(newTitle: string) {
    this.title.set(newTitle);
  }
}
