'use strict';
define(
    [
        '/scripts/app/js/action/Base.js'
    ],
    function (Base) {
        let $this;
        return class paid extends Base {

            initAction(){
                super.initAction();
                $this = this;

                $this.vxmlParser.events = events;
                $this.vxmlParser.finish = finish;

                let xmlString = $('#vxml').html();
                let xml = $.parseXML(xmlString);

                $this.vxmlParser.parse(xml);
            }
        };

        function events(name) {

        }

        function finish() {
            window.location = "/resetShopCard";
        }
    }
);