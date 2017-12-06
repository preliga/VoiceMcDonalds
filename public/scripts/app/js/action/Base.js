'use strict';
define(
    [
        '/scripts/lib/Pig/Action.js',
        '/scripts/app/js/model/VXMLParser.js'
    ],
    function (Action, VXMLParser) {
        var $this;
        return class Base extends Action {

            initAction() {
                $this = this;
                $this.vxmlParser = new VXMLParser(view.file);
            }
        };
    });