'use strict';
define(
    [],
    function () {
        var $this;
        return class VXMLParser {

            constructor(url) {
                $this = this;
                $this.url = url.substr(9);
                // $this.init();
            }

            parse(xml) {
                // $this.setField('type', "na dowóz");
                //
                // $this.finish();
                //
                // $this.recognition().then(function (recognized) {
                //     console.log(recognized);
                //
                //     $this.recognition().then(function (recognized2) {
                //         console.log(recognized2);
                //         console.log(recognized);
                //     });
                // });

                // var firstPrompt = xml.getElementsByTagName("form")[0].getElementsByTagName("block")[0].getElementsByTagName("prompt")[0].textContent;
                //
                // $this.speech(firstPrompt);
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

            speech(messageText) {
                var msg = new SpeechSynthesisUtterance(messageText);
                window.speechSynthesis.speak(msg);
            }


            setField(name, value) {
                $("input[name='" + name + "']").val(value);

                $this.events(name);
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
                        var audioText = "";
                        for (var value of response.data.speechRecognition) {
                            $this.speech(value);
                            audioText += value + "<BR>";
                        }

                        $("#audioText").html(audioText);

                        resolve(audioText);
                    });
                });
            }
        };
    });