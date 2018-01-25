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

                let xmlString = $('#vxml').html().trim().replace(/(?:\t|\r\n|\r|\n)/g,'');
                let xml = $.parseXML(xmlString);

                $this.vxmlParser.parse(xml);
            }
        };

        function events(name) {
            return new Promise((resolve, reject) => {

                resolve(true);
            });
        }

        function finish() {
            window.location = "/resetShopCard";
        }
    }
);