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

            }

            afterRender() {
                console.log("QWE");
                $this.vxmlParser = new VXMLParser(view.file);
            }
        };
    });