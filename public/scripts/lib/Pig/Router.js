'use strict';
define(
    [
        mainAction
    ],
    function (Action) {

        function ready(action) {
            if (document.readyState !== 'loading') {
                action.afterRender();
            } else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', action.afterRender);
            } else {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState !== 'loading') {
                        action.afterRender();
                    }
                });
            }
        }

        return class Router {
            constructor() {
            }

            route() {
                var action = new Action();
                action.initAction();
                action.beforeRender();
                ready(action);
            }
        };
    }
);