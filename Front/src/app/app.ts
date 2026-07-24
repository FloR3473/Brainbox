import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Barside } from "./barside/barside";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Barside],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Front');
}
