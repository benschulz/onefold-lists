'use strict';

define(['onefold-lists', './contains', './filter', './for-each'], function (lists) {
    var tests = arguments;

    describe('asList', function () {
        it('Changes to the backing array should be reflected.', function () {
            var backingArray = [];
            var list = lists.newArrayList(backingArray);

            backingArray.push(1, 2, 3);

            expect(list.length).to.equal(3);
        });

        Array.prototype.slice.call(tests, 1).forEach(function (test) {
            test();
        });
    });
});
