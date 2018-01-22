'use strict';
define(
    [],
    function () {
        let $this;
        var msgs = [];
        var form = {};
        return class VXMLParser {

            static goToSubdialog(src, params = {}) {
                console.log(params);
                window.location = src + "?params=" + JSON.stringify(params);
            }

            static speech(messageText) {
                return new Promise((resolve, reject) => {
                    var msg = new SpeechSynthesisUtterance();
                    msg.text = messageText;
                    msg.lang = "pl-PL";
                    msg.pitch = 1;
                    msg.rate = 0.8;
                    msg.volume = 0.3;
                    msg.onend = function () {
                        resolve();
                    };
                    msgs.push(msg);
                    window.speechSynthesis.speak(msg);
                });
            }

            constructor(params) {
                $this = this;
                $this.params = params;
            }

            doBlock(block, index, doElse) {
                return new Promise((resolve, reject) => {
                    if (index == block.childNodes.length) {
                        resolve(1);
                    }
                    else {
                        var node = block.childNodes[index];

                        switch (node.nodeName) {
                            case "prompt":
                                VXMLParser.speech(node.textContent).then(function () {
                                    $this.doBlock(block, index + 1, false).then(function (a) {
                                        resolve(a);
                                    });
                                });
                                break;
                            case "if":
                                var cond = node.attributes["cond"].value.split("==");
                                if (form[cond[0]] == cond[1]) {
                                    $this.doBlock(node, 0, false).then(function (a) {
                                        $this.doBlock(block, index + 1, false).then(function (b) {
                                            if ((typeof a) == "number") {
                                                resolve(b);
                                            } else {
                                                resolve(a);
                                            }
                                        });
                                    });
                                } else {
                                    $this.doBlock(node.getElementsByTagName("else")[0], 0, true).then(function (a) {
                                        $this.doBlock(block, index + 1, false).then(function (b) {
                                            if ((typeof a) == "number") {
                                                resolve(b);
                                            } else {
                                                resolve(a);
                                            }
                                        });
                                    });
                                }
                                break;
                            case "goto":
                                $this.doBlock(block, index + 1, false).then(function () {
                                    resolve(node.attributes["next"].textContent);
                                });
                                break;
                            case "else":
                                if (doElse) {
                                    $this.doBlock(node, 0, false).then(function (a) {
                                        $this.doBlock(block, index + 1, false).then(function (b) {
                                            if ((typeof a) == "number") {
                                                resolve(b);
                                            } else {
                                                resolve(a);
                                            }
                                        });
                                    });
                                }
                                else {
                                    $this.doBlock(block, index + 1, false).then(function (a) {
                                        resolve(a);
                                    });
                                }
                                break;
                        }
                    }
                });
            }

            async doTheThing(node) {
                return new Promise((resolve, reject) => {
                    //console.log("nodeName = " + node.nodeName);

                    switch (node.nodeName) {
                        case "block":
                            $this.doBlock(node, 0, false).then(function (ret) {
                                resolve(ret);
                            });
                            break;
                        case "field":

                            var condAttribute = node.attributes["cond"];
                            var cond = true;

                            if ((typeof condAttribute) != "undefined") {
                                condAttribute = condAttribute.value.split("==");
                                if (form[condAttribute[0]] != condAttribute[1]) {
                                    cond = false;
                                }
                            }
                            if (cond) {
                                var e_grammar = node.getElementsByTagName("grammar");
                                var e_prompt = node.getElementsByTagName("prompt");
                                console.log(e_prompt[0].textContent);
                                VXMLParser.speech(e_prompt[0].textContent).then(function () {
                                    var grammar = e_grammar[0].textContent.replace(/(?:]|\[)/g, '').trim().split("|");
                                    console.log(grammar);
                                    $this.recognitionGrammar(grammar).then(function (recognizedText) {
                                        console.log("Powiedziałeś: " + recognizedText);
                                        if (recognizedText == "") {
                                            resolve(0);
                                        } else {
                                            form[node.attributes[0].textContent] = recognizedText;
                                            $this.setField(node.attributes["name"].textContent, recognizedText).then(function () {
                                                resolve(1); // trzba zawsze poczekać aż się pole ustawi bo bez tego trudno się wydostać z pierwszego ekranu
                                            });
                                            // resolve(1);
                                        }
                                    });
                                });
                            } else {
                                resolve(1);
                            }
                            break;
                        case "subdialog":
                            var param = node.getElementsByTagName("params");
                            var params = {};
                            if (param.length > 0) {
                                params[param[0].attributes["name"].textContent] = form[param[0].attributes["expr"].textContent];
                            }
                            VXMLParser.goToSubdialog(node.attributes["src"].textContent, params);
                            resolve(1);
                            break;
                        case "initial":
                            resolve(1);
                            break;
                        case "grammar":
                            resolve(1);
                            break;
                    }
                });
            };

            async parse(xml) {

                //console.log("This is vxml parser.");

                var forms = xml.getElementsByTagName("form");
                var nodes = forms[0].childNodes;
                console.log(form);

                //nodes.forEach(await doTheThing);
                var i = 0;
                var k;
                var f;
                while (i < nodes.length) {
                    await $this.doTheThing(nodes[i]).then(function (next) {
                        if ((typeof next) == "number") {
                            i = i + next;
                        }
                        else {
                            i = 0;
                            k = 0;
                            f = true;
                            while (f) {
                                if (forms[k].attributes.length > 0 && forms[k].attributes["id"].textContent == next) {
                                    f = false;
                                } else {
                                    k++;
                                }
                            }
                            nodes = forms[k].childNodes;
                        }
                    });
                }

                console.log("vxml finished!");

                //await VXMLParser.speech("ala ma kota");
                //console.log("ala ma kota");

                //console.log(node1);


                //VXMLParser.speech("Czy chcesz zakończyć?");
                //var aaa = await $this.recognition();
                //VXMLParser.speech("Powiedziałeś: " + aaa);


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


            setField(name, value) {
                return new Promise((resolve, reject) => {
                    $("input[name='" + name + "']").val(value);

                    resolve($this.events(name));
                });
            }


            recognitionGrammar(grammar) {
                return new Promise((resolve, reject) => {
                    $this.recognition().then(function (recognizedText) {
                        var text = "";
                        for (var i = 0; i < grammar.length; i++) {
                            if (recognizedText.includes(grammar[i])) {
                                text = grammar[i];
                            }
                        }
                        if (grammar.length == 0) {
                            resolve(recognizedText);
                        } else {
                            resolve(text);
                        }
                    });
                });
            }


            recognition() {
                return new Promise((resolve, reject) => {
                    Fr.voice.record($("#live").is(":checked"), function () {
                        $(".recorder").show();
                        Fr.voice.stopRecordingAfter(3000, function () {
                            $(".recorder").hide();
                            // alert("Recording stopped after 5 seconds");

                            Fr.voice.export(function (audio) {
                                resolve($this.speechRecognition(audio));
                            }, "base64");
                        });
                    });
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
                            //VXMLParser.speech(value);
                            audioText += value;// + "<BR>";
                        }

                        //$("#audioText").html(audioText);

                        resolve(audioText);
                    });
                });
            }
        };
    });