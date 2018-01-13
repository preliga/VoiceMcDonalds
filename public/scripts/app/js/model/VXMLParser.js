'use strict';
define(
    [],
    function () {
        let $this;
        return class VXMLParser {

            static goToSubdialog(src, params = {}) {
                console.log(params);
                window.location = src + "?params="+JSON.stringify(params);
            }

            static speech(messageText) {
                let msg = new SpeechSynthesisUtterance(messageText);
                window.speechSynthesis.speak(msg);
            }

            constructor(params) {
                $this = this;
                $this.params = params;
            }

            parse(xml) {

                // if (window.location.pathname !== '/order'){
                //     $this.setField('type', "na dowóz").then(function(){
                //         // VXMLParser.goToSubdialog('/order', {type: 'na dowóz'});
                //         VXMLParser.goToSubdialog('/order');
                //     });
                // }

                // VXMLParser.speech("Dzień dobry");
                // $this.setField('type', "na dowóz");

                // $this.finish();
                //
                // $this.recognition().then(function (recognized) {
                //     console.log(recognized);
                //
                //     // $this.recognition().then(function (recognized2) {
                //     //     console.log(recognized2);
                //     //     console.log(recognized);
                //     // });
                // });
                //
                // var firstPrompt = xml.getElementsByTagName("form")[0].getElementsByTagName("block")[0].getElementsByTagName("prompt")[0].textContent;
                //
                // VXMLParser.speech(firstPrompt);
                // console.log(xml.getElementsByTagName("form")[0].getElementsByTagName("block")[0].getElementsByTagName("prompt")[0].textContent);
            }



            recognition() {
                return new Promise((resolve, reject) => {
                    Fr.voice.record($("#live").is(":checked"), function () {
                        $(".recorder").show();
                        Fr.voice.stopRecordingAfter(5000, function () {
                            $(".recorder").hide();
                            // alert("Recording stopped after 5 seconds");

                            Fr.voice.export(function (audio) {
                                resolve($this.speechRecognition(audio));
                            }, "base64");
                        });
                    });
                });
            }

            setField(name, value) {
                return new Promise((resolve, reject) => {
                    $("input[name='" + name + "']").val(value);

                    resolve($this.events(name));
                });
            }

            speechRecognition(audio) {
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: "/speechRecognition?json=true",
                        method: 'POST',
                        beforeSend: function () {
                            $("#loader").show();
                        },
                        data: {
                            audio: audio
                        }
                    }).done(function (response) {
                        $("#loader").hide();
                        let audioText = "";
                        for (let value of response.data.speechRecognition) {
                            VXMLParser.speech(value);
                            audioText += value + "<BR>";
                        }

                        $("#audioText").html(audioText);

                        resolve(audioText);
                    });
                });
            }
        };
    });