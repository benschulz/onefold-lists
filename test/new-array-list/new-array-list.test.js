'use strict';

define(['onefold-lists', './contains.test', './filter.test', './for-each.test'], function (lists) {
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
