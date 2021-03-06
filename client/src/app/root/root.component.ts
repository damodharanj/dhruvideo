import { Component } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

const transcript = [
  ['Hello', 'jello', 'overlay', '3', '1'],
  ['Dei', 'rubberBand', 'normal', '3', '2'],
  ['Inga', 'rubberBand', 'normal', '3', '3'],
  ['Neriya', 'rubberBand', 'normal', '3', '4'],
  ['Info', 'rubberBand', 'normal', '3', '5'],
  ['irukku', 'rubberBand', 'normal', '3', '6'],
  ['COme', 'rubberBand', 'normal', '3', '1'],
  ['and', 'rubberBand', 'normal', '3', '2'],
  ['Get', 'rubberBand', 'normal', '3', '4']
];

function clickAndDownload(a, file, name) {
  a.href = URL.createObjectURL(file);
  a.target = '_blank';
  a.download = name;
  a.click();
}

function download  (value) {
  const a = document.createElement('a');
  const file = new Blob([value], {type: 'text/plain'});
  clickAndDownload(a, file, 'video.html');
}


@Component({
  selector: 'app-dash',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  /** Based on the screen size, switch from standard to one column per row */
  imgs = Array(9).fill('https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png');
  reader = new FileReader();
  template = '';
  script = transcript;

  constructor(
    apollo: Apollo
  ) {
    apollo
      .query({
        query: gql`
        {
          hero {
            name
            friends {
              name
              appearsIn
            }
          }
        }
        `,
      })
      .subscribe(console.log);
  }

  onChange(e, img, index, frame) {
    this.imgs[index] = URL.createObjectURL(e.target.files[0]);
    img.setAttribute('src', this.imgs[index]);
  }

  updateScript(val) {
    const out = val.split('\n').map((x) => {
      return x.split(',');
    });
    this.script = out;
  }

  getTemplate() {
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
        <style>
          .slide {
            width: 1500px;
          }
          .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #00000045;
            text-align: center;
            font-size: 150px;
            padding-top: 256px;
            color: white;
          }
        </style>
    </head>

    <body class="impress-not-supported">

    <div class="fallback-message">
        <p>For the best experience please use the latest <b>Chrome</b>, <b>Safari</b> or <b>Firefox</b> browser.</p>
    </div>

    <div id="impress" data-autoplay="1">

        ${this.imgs.map((img, i) => `
          <div class="step slide"
            data-x="${i * 1000}"
            data-y="${i * 1000}"
            data-y="${i * 1000}"
            data-rotate-x="${i * 20}"
            data-rotate-y="${i * 90}"
            data-autoplay="${this.script[i][3]}">
            <div class="${this.script[i][2] ? this.script[i][2] : ''} animated infinite ${this.script[i][1]}">${this.script[i][0]}</div>
            <img style="width: 100%; height: 100%;" src="${img}"/>
          </div>
        `).join('')}
    </div>

    <div id="impress-toolbar"></div>
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
    return template;
  }

  renderVideo(iframe) {
    const templ = this.getTemplate();
    iframe.src = 'about:blank';
    iframe.contentDocument.write(templ);
  }

  download() {
    download(this.getTemplate());
  }


}
