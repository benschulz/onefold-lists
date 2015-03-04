'use strict';

define(['onefold-js', 'onefold-lists'], function (js, lists) {
    function divisibleByTwo(e) { return e % 2 === 0; }
    
    return function () {
        describe('filter', function () {
            it('The returned list should contain elements which satisfy the given predicate.', function () {
                var list = lists.newArrayList([1, 2, 3, 4, 5]);

                var result = list.filter(divisibleByTwo);

                expect(result.contains(2)).to.equal(true);
                expect(result.contains(4)).to.equal(true);
            });

            it('The returned list should not contain elements which do not satisfy the given predicate.', function () {
                var list = lists.newArrayList([1, 2, 3, 4, 5]);

                var result = list.filter(divisibleByTwo);

                expect(result.contains(1)).to.equal(false);
                expect(result.contains(3)).to.equal(false);
                expect(result.contains(5)).to.equal(false);
            });

            it('The returned list should be independent from the source list.', function () {
                var sourceBackingArray = ['foo'];
                var source = lists.newArrayList(sourceBackingArray);
                var filtered = source.filter(js.functions.true);

                sourceBackingArray.push('bar');

                expect(filtered.length).to.equal(1);
            });
        });
    };
});
