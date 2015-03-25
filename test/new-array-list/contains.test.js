'use strict';

define(['onefold-lists'], function (lists) {
    return function () {
        describe('contains', function () {
            it('should return `true` if the list contains the given element.', function () {
                var list = lists.newArrayList(['zab', 'rab', 'oof']);

                var result = list.contains('oof');

                expect(result).to.equal(true);
            });

            it('should return `false` if the list does not contain the given element.', function () {
                var list = lists.newArrayList(['zab', 'rab', 'oof']);

                var result = list.contains('foo');

                expect(result).to.equal(false);
            });
        });
    };
});
