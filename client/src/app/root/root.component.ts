import { Component } from '@angular/core';

const transcript = [
  ['Hello', 'jello'],
  ['Dei', 'rubberBand'],
  ['Inga', 'rubberBand'],
  ['Neriya', 'rubberBand'],
  ['Info', 'rubberBand'],
  ['irukku', 'rubberBand'],
  ['COme', 'rubberBand'],
  ['and', 'rubberBand'],
  ['Get', 'rubberBand']
];

@Component({
  selector: 'app-dash',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  /** Based on the screen size, switch from standard to one column per row */
  imgs = Array(9).fill('https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');
  reader = new FileReader();
  script = transcript;

  constructor() {}

  onChange(e, img, index, frame) {
    this.imgs[index] = URL.createObjectURL(e.target.files[0]);
    img.setAttribute('src', this.imgs[index]);
  }

  updateScript(val) {
    this.script = val.split('\n');
  }

  renderVideo(iframe) {
    const template = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=1024" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <title>impress.js </title>
        <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
        <link href="https://impress.js.org/css/impress-demo.css" rel="stylesheet" />

        <link rel="shortcut icon" href="favicon.png" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    </head>

    <body class="impress-not-supported">

    <div class="fallback-message">
        <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>
    </div>

    <div id="impress" data-autoplay="1">

        <div id="bored" class="step slide" data-x="-1000" data-y="-1500" data-autoplay="1">
            <q>Aren’t you just <b>bored</b> with all those slides-based presentations?</q>
        </div>

        ${this.imgs.map((img, i) => `
          <div class="step slide"
            data-x="${(i) * 1000}"
            data-rotate="${i * 90}"
            data-autoplay="1">
            <div class="animated infinite ${this.script[i][1]}">${this.script[i][0]}</div>
            <img style="width: 100%; height: 100%;" src="${img}"/>
          </div>
        `).join('')}

    </div>

    <div id="impress-toolbar"></div>

    <div class="hint">
        <p>Use a spacebar or arrow keys to navigate. <br/>
           Press 'P' to launch speaker console.</p>
    </div>
    <script>
    if ("ontouchstart" in document.documentElement) {
        document.querySelector(".hint").innerHTML = "<p>Swipe left or right to navigate</p>";
    }
    </script>

    <script src="https://impress.js.org/js/impress.js"></script>
    <script>impress().init();</script>

    </body>
    </html>
    `;
    iframe.src = 'about:blank';
    iframe.contentDocument.write(template);
  }
}
