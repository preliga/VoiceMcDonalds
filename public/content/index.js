'use strict';
define(
    [
        '/scripts/app/js/action/Base.js'
    ],
    function (Base) {
        let $this;
        return class index extends Base {

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
            // console.log(name);
            // console.log($("input[name='" + name + "']").val());

            let typ = $("input[name='" + name + "']").val() == 'na miejscu'? 1 : 2;

            /**
             * Typ
             * 1 - na miejscu
             * 2 - na dowóz
             */

            switch (name) {
                case 'type':
                    $.ajax({
                        url: "/index?json=true",
                        method: 'POST',
                        beforeSend: function () {
                            $("#loader").show();
                        },
                        data: {
                            type: typ
                        },
                        success: function (respond){
                            $("#loader").hide();

                            window.location = "/order";
                        }
                    });
                    break;

            }
        }

        function finish() {
            console.log('finish');
        }
    }
);