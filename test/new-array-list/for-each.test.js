'use strict';

define(['onefold-lists'], function (lists) {
    return function () {
        describe('forEach', function () {
            it('should call the given action one for each element.', function () {
                var list = lists.newArrayList([1, 2, 4]);

                var flags = 0;
                list.forEach(function (element) {
                    flags ^= element;
                });

                expect(flags).to.equal(7);
            });

            it('should pass the element, its index and the list.', function () {
                var list = lists.newArrayList([1, 2, 4]);

                var flags = 0;
                list.forEach(function (element) {
                    flags ^= element;
                });

                expect(flags).to.equal(7);
            });
        });
    };
});
