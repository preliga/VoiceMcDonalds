'use strict';
define(
    [
        '/scripts/app/js/action/Base.js'
    ],
    function (Base) {
        let $this;
        return class order extends Base {
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

                $("input[name='category']").keyup(function () {
                    events('category')
                });

                $("input[name='product']").keyup(function () {
                    events('product')
                });

                $("input[name='amount']").keyup(function () {
                    events('amount')
                });

                $("input[name='accept']").keyup(function () {
                    events('accept')
                });

                $("input[name='again']").keyup(function () {
                    events('again')
                });
            }
        };

        function events(name) {
            return new Promise((resolve, reject) => {

                let value = $("input[name='" + name + "']").val().trim().toLowerCase();

                switch (name) {
                    case 'category':
						console.log("event category");
						
                        if (value !== 'dodatki') {
                            $(".Dodatki").slideUp();
                        }

                        if (value !== 'kanapki') {
                            $(".Kanapki").slideUp();
                        }

                        if (value !== 'napoje') {
                            $(".Napoje").slideUp();
                        }

                        $("." + value).slideDown("slow");

                        resolve(true);
                        break;

                    case 'product':
						console.log("event product");
						
                        $this.product = null;
                        for (let item of view.products) {
                            if (value === item.name.trim().toLowerCase()) {
                                $this.product = item;
                            }
                        }

                        if ($this.product !== null) {
                            console.log("test");
                            $(".amount").slideDown("slow");
                        }

                        resolve(true);
                        break;
                    case 'amount':
						console.log("event amount");
						
                        value = Number(value);
                        if (Number.isInteger(value) && value > 0) {
                            $this.amount = value;

                            let html = '     <span>\n' +
                                '                <img style="margin: 10px;" src="' + $this.product.picture + '"   height="200"/>\n' +
                                '                <br><br>\n' +
                                '                ' + $this.product.name + '\n' +
                                '                <br>\n' +
                                '                ' + $this.product.price + ' zł\n' +
                                '                <br>\n' +
                                '                Ilość: ' + $this.amount + ' \n' +
                                '            </span>';

                            $('.orderProduct').html(html);

                            $(".amount").slideUp();
                            $(".acceptOrder").slideDown("slow");
                        }

                        resolve(true);
                        break;
                    case 'accept':
						console.log("event accept");
						
                        let amount = $this.amount;

                        if (value === 'tak') {
                            $.ajax({
                                url: "/addProduct",
                                method: 'GET',
                                data: {
                                    productId: $this.product.id,
                                    amount: amount,
                                    json: true
                                },
                                beforeSend: function () {
                                    $("#loader").show();
                                },
                                success: function (respond) {
                                    $("#loader").hide();

                                    $('.shopCard').prepend('<tr><td>' + $this.product.name + '</td><td>' + amount + '</td><td>' + $this.product.price + '</td></tr>');
                                    $("#priceSum").html(respond.data.shopCard.priceSum);

                                    $(".again").slideDown('slow');

                                    resolve(true);
                                }
                            });
                        }

                        if (value === 'nie') {
                            $(".again").slideDown('slow');

                            resolve(true);
                        }

                        break;
                    case 'again':
						console.log("event again");
						
                        if (value === 'tak') {
                            $(".Dodatki").slideUp();
                            $(".Kanapki").slideUp();
                            $(".Napoje").slideUp();
                            $(".amount").slideUp();
                            $(".acceptOrder").slideUp();
                            $(".again").slideUp();

                            $("input").val("");

                            resolve(true);
                        }

                        if (value === 'nie') {

                            resolve(true);
                            window.location = '/acceptationOrder';
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