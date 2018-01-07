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

            afterRender() {
                super.afterRender();

                $("input[name='type']").keyup(function(){
                    events('type')
                });
            }
        };

        function events(name) {

            let value = $("input[name='" + name + "']").val().trim().toLowerCase();

            switch (name) {
                case 'type':

                    /**
                     * Typ
                     * 1 - na miejscu
                     * 2 - na dowóz
                     */
                    let typ = 0;

                    if (value === 'na miejscu') {
                        typ = 1;
                    }

                    if (value === 'na dowóz') {
                        typ = 2;
                    }

                    if (typ !== 0) {
                        $.ajax({
                            url: "/setType",
                            method: 'GET',
                            data: {
                                type: typ,
                                json: true
                            },
                            beforeSend: function () {
                                $("#loader").show();
                            },
                            success: function (respond) {
                                $("#loader").hide();

                                window.location = "/order";
                            }
                        });
                    }
                    break;

            }
        }

        function finish() {
            console.log('finish');
        }
    }
);