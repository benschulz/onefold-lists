/*
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
define(['onefold-js'],    function(onefold_js) {
var onefold_lists_internal, onefold_lists;

onefold_lists_internal = function (js) {
  function prototyper(extensions) {
    var internal = {
      get length() {
        return this['length'];
      },
      contains: function (value) {
        return this.tryFirstIndexOf(value) >= 0;
      },
      filter: function (predicate) {
        var length = this.length, array = [];
        for (var i = 0; i < length; ++i) {
          var element = this.get(i);
          if (predicate(element, i, this))
            array.push(element);
        }
        return new ArrayList(array);
      },
      forEach: function (action) {
        var length = this.length;
        for (var i = 0; i < length; ++i)
          action(this.get(i), i, this);
      },
      get: function (index) {
        return this['get'](index);
      },
      map: function (mapping) {
        var length = this.length, array = new Array(length);
        for (var i = 0; i < length; ++i)
          array[i] = mapping(this.get(i), i, this);
        return new ArrayList(array);
      },
      readOnly: function () {
        return new ReadOnlyListView(this);
      },
      reduce: function (accumulator, identity) {
        var initialValueSpecified = arguments.length > 1;
        var length = this.length;
        if (!initialValueSpecified && length === 0)
          throw new TypeError('An empty list can not be reduced, specify an initial value.');
        var aggregate = initialValueSpecified ? identity : this.get(0);
        for (var i = initialValueSpecified ? 0 : 1; i < length; ++i)
          aggregate = accumulator(aggregate, this.get(i));
        return aggregate;
      },
      slice: function (beginIndex, endIndex) {
        var length = this.length;
        beginIndex = arguments.length <= 0 ? 0 : beginIndex >= 0 ? beginIndex : length + beginIndex;
        endIndex = arguments.length <= 1 ? length : endIndex >= 0 ? endIndex : length + endIndex;
        var resultLength = endIndex - beginIndex;
        var array = new Array(resultLength);
        for (var i = 0; i < resultLength; ++i) {
          array[i] = this.get(beginIndex + i);
        }
        return new ArrayList(array);
      },
      toArray: function () {
        var length = this.length, array = new Array(length);
        for (var i = 0; i < length; ++i)
          array[i] = this.get(i);
        return array;
      },
      tryFirstIndexOf: function (value) {
        var length = this.length;
        for (var i = 0; i < length; ++i)
          if (this.get(i) === value)
            return i;
        return -1;
      }
    };
    var exported = {
      get 'length'() {
        return this.length;
      },
      'contains': internal.contains,
      'filter': internal.filter,
      'forEach': internal.forEach,
      'get': function (index) {
        return this.get(index);
      },
      'map': internal.map,
      'readOnly': internal.readOnly,
      'reduce': internal.reduce,
      'slice': internal.slice,
      'toArray': internal.toArray,
      'tryFirstIndexOf': internal.tryFirstIndexOf
    };
    return js.objects.extend(internal, exported, extensions);
  }
  /**
   * @constructor
   * @template E
   *
   * @param {Array<E>} array
   */
  function ArrayList(array) {
    this.__array = array;
  }
  ArrayList.prototype = prototyper({
    get length() {
      return this.__array.length;
    },
    get: function (index) {
      return this.__array[index];
    },
    toArray: function () {
      return this.__array.slice();
    }
  });
  /**
   * @constructor
   * @template E
   *
   * @param {de.benshu.onefold.lists.List<E>} list
   */
  function ReadOnlyListView(list) {
    this.__list = list;
  }
  ReadOnlyListView.prototype = prototyper({
    get length() {
      return this.__list.length;
    },
    get: function (index) {
      return this.__list.get(index);
    }
  });
  return {
    newArrayList: function (array) {
      return new ArrayList(array || []);
    },
    listPrototype: prototyper
  };
}(onefold_js);
onefold_lists = function (main) {
  return main;
}(onefold_lists_internal);return onefold_lists;
});