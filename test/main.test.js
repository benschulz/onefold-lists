'use strict';

require(['require', 'chai'], function (require, chai) {
    mocha.setup('bdd');

    window.expect = chai.expect;

    require(['new-array-list/new-array-list.test'], function () {
        window.__karma__.start();
    });

});
