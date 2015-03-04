'use strict';

require(['require', 'chai'], function (require, chai) {
    mocha.setup('bdd');

    window.expect = chai.expect;

    require(['new-array-list/new-array-list'], function () {
        window.__karma__.start();
    });

});
