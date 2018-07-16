const puppeteer           = require('puppeteer');
console.log("DMAOOO", __dirname)
var options = {
  headless: false,
  args: [
    '--enable-usermedia-screen-capturing',
    '--allow-http-screen-capture',
    '--no-sandbox',
    '--auto-select-desktop-capture-source=pickme',
    '--disable-setuid-sandbox',
    '--load-extension=' + __dirname,,
    '--disable-extensions-except=' + __dirname,
  ]
}

var mybrowser = null;
puppeteer.launch(options).then(browser=>{
    mybrowser = browser;
    return browser.pages().then(pages=>{
        var page = pages[0];
        return page.goto('file:///Users/damodharan-2579/Pictures/Pokemon/impress.js-master/index.html#/big', {waitUntil: 'networkidle2'}).then(_=>{
            return page.evaluate(()=>{
                var session = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'screen',
                        },
                        optional: []
                    },
                };
            })
        })
    }).then(_=>{
        // mybrowser.close();
    })
})

