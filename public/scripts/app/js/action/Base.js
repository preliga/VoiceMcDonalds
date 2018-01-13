'use strict';
define(
    [
        '/scripts/lib/PigFrameworkJS/Action.js',
        '/scripts/app/js/model/VXMLParser.js'
    ],
    function (Action, VXMLParser) {
        var $this;
        return class Base extends Action {

            initAction() {
                $this = this;


                let params = {};

                if(typeof view.params.params != 'undefined'){
                    let params = JSON.parse(view.params.params);
                }

                console.log(params);
                
                $this.vxmlParser = new VXMLParser(params);

                $this.vxmlParser.events = function () {

                };

                $this.vxmlParser.finish = function () {

                };
            }

            afterRender() {

            }
        };
    });