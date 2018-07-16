/* global chrome, MediaRecorder, FileReader */

chrome.runtime.onConnect.addListener(port => {
  let recorder = null
  port.onMessage.addListener(msg => {
    console.log(msg);
    switch (msg.type) {
      case 'REC_STOP':
        console.log('Stopping recording')
        if (!port.recorderPlaying || !recorder) {
          console.log('Nothing to stop')
          return
        }
        port.recorderPlaying = false    
        recorder.stop()    
        break
      case 'REC_CLIENT_PLAY':
        if (port.recorderPlaying) {
          console.log('Ignoring second play, already playing')
          return
        }
        port.recorderPlaying = true
        const tab = port.sender.tab
        tab.url = msg.data.url
        chrome.desktopCapture.chooseDesktopMedia(['tab', 'audio'], streamId => {
          // Get the stream
          navigator.webkitGetUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: streamId,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720,
                minFrameRate: 60,
              }
            }
          }, stream => {
            var chunks=[];
            recorder = new MediaRecorder(stream, {
                videoBitsPerSecond: 2500000,
                ignoreMutedMedia: true,
                mimeType: 'video/webm'
            });
            recorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            recorder.onstop = function () {
                var superBuffer = new Blob(chunks, {
                    type: 'video/webm'
                });

                var url = URL.createObjectURL(superBuffer);
                // var a = document.createElement('a');
                // document.body.appendChild(a);
                // a.style = 'display: none';
                // a.href = url;
                // a.download = 'test.webm';
                // a.click();

              chrome.downloads.download({
                url: url,
                //filename: "suggested/filename/with/relative.path" // Optional
              });
            }

            recorder.start();

            setTimeout(()=>{
                recorder.stop()
            }, 20000)
          }, error => console.log('Unable to get user media', error))
        })
        break
      default:
        console.log('Unrecognized message', msg)
    }
  })
})
