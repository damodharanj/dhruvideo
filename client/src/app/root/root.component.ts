import { Component, ViewChild, TemplateRef } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import IM from '../../../node_modules/impress.js/js/impress.js';

@Component({
  selector: 'app-dash',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  /** Based on the screen size, switch from standard to one column per row */
  imgs = Array(9).fill('https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');
  reader = new FileReader();

  constructor() {}

  onChange(e, img, index, frame) {
    this.imgs[index] = URL.createObjectURL(e.target.files[0]);
    img.setAttribute('src', this.imgs[index]);
    console.log({a: frame});
  }
}
