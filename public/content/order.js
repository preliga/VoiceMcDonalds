'use strict';
define(
    [
        '/scripts/app/js/action/Base.js'
    ],
    function (Base) {
        var $this;
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
            console.log(name);
            // console.log($("input[name='" + name + "']").val());
            switch (name) {
                case 'type':
                    // $.ajax({
                    //     url: "/index?json=true",
                    //     method: 'POST',
                    //     beforeSend: function () {
                    //         $("#loader").show();
                    //     },
                    //     data: {
                    //         type: $("input[name='" + name + "']").val()
                    //     },
                    //     success: function (respond){
                    //         $("#loader").hide();
                    //
                    //         window.location = "/order";
                    //     }
                    // });
                    break;

            }
        }

        function finish() {
            console.log('finish');
        }

    }
);