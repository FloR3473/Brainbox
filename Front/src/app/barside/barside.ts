import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-barside',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './barside.html',
  styleUrl: './barside.scss',
})
export class Barside {}
