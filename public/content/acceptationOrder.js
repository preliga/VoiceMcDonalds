'use strict';
define(
    [
        '/scripts/app/js/action/Base.js'
    ],
    function (Base) {
        let $this;
        return class acceptationOrder extends Base {
            initAction() {
                super.initAction();
                $this = this;

                $this.vxmlParser.events = events;
                $this.vxmlParser.finish = finish;

                let xmlString = $('#vxml').html().trim().replace(/(?:\t|\r\n|\r|\n)/g,'');
                let xml = $.parseXML(xmlString);

                $this.vxmlParser.parse(xml);
            }

            afterRender() {
                super.afterRender();

                $("input[name='streetNumber']").keyup(function () {
                    events('streetNumber')
                });

                $("input[name='streetName']").keyup(function () {
                    events('streetName')
                });

                $("input[name='city']").keyup(function () {
                    events('city')
                });

                $("input[name='paid']").keyup(function () {
                    events('paid')
                });
            }
        };

        function events(name) {
            return new Promise((resolve, reject) => {
                let value = $("input[name='" + name + "']").val().trim().toLowerCase();

                switch (name) {
                    case 'streetNumber':
                    case 'streetName':
                    case 'city':

                        let streetNumber = $("input[name='streetNumber']").val().trim();
                        let streetName = $("input[name='streetName']").val().trim();
                        let city = $("input[name='city']").val().trim();

                        if (streetNumber !== '' && streetName !== '' && city !== '') {
                            $('.paid').slideDown("slow");
                            $('.address').slideUp();

                            $('.yourAddress').html("<h3>Twój adres:</h3><p>" + streetName + " " + streetNumber + ", " + city + "</p>");
                            $('.yourAddress').slideDown('slow');
                        }

                        resolve(true);
                        break;
                    case 'paid':
                        if (value === 'tak') {
                            // window.location = '/paid?paid=tak';

                            resolve(true);
                        }

                        if (value === 'nie') {
                            // window.location = '/paid?paid=nie';

                            resolve(true);
                        }

                        break;
                }
            });
        }

        function finish() {
            console.log('finish');
        }

    }
);