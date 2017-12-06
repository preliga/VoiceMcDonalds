'use strict';
define(
    [
        // '/scripts/lib/Pig/Action.js'
    ],
    function () {
        var $this;
        return class VXMLParser{

            constructor(url){
                $this = this;
                $this.url = url.substr(9);
                $this.init();
            }



            init(){
                var url = "/dialog?file=" + $this.url;

                console.log($this.url);
                var myHeaders = new Headers();

                var myInit = { method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' };
                console.log(url);
                fetch(url, myInit)
                    .then(response => response.text())
                    .then(xmlString => $.parseXML(xmlString))
                    .then(function(xml){
                        $this.parse(xml)
                    })
                ;

            }

            parse(xml) {

                var firstPrompt = xml.getElementsByTagName("form")[0].getElementsByTagName("block")[0].getElementsByTagName("prompt")[0].textContent;

                $this.speech(firstPrompt);
                console.log(xml.getElementsByTagName("form")[0].getElementsByTagName("block")[0].getElementsByTagName("prompt")[0].textContent);
            }

            speech(messageText){
                var msg = new SpeechSynthesisUtterance(messageText);
                window.speechSynthesis.speak(msg);
            }
        };
    });