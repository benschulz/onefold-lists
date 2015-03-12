/**
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
      contains: function (element) {
        return this.tryFirstIndexOf(element) >= 0;
      },
      filter: function (predicate) {
        var array = [];
        for (var i = 0; i < this.length; ++i) {
          var element = this.get(i);
          if (predicate(element, i, this))
            array.push(element);
        }
        return new ArrayList(array);
      },
      forEach: function (action) {
        for (var i = 0, length = this.length; i < length; ++i)
          action(this.get(i), i, this);
      },
      get: function (index) {
        return this['get'](index);
      },
      map: function (mapping) {
        var array = new Array(this.length);
        for (var i = 0; i < this.length; ++i)
          array[i] = mapping(this.get(i), i, this);
        return new ArrayList(array);
      },
      readOnly: function () {
        return new ReadOnlyListView(this);
      },
      slice: function (start, end) {
        var length = this.length;
        start = arguments.length <= 0 ? 0 : start >= 0 ? start : length + start;
        end = arguments.length <= 1 ? length : end >= 0 ? end : length + end;
        var resultLength = end - start;
        var array = new Array(resultLength);
        for (var i = 0; i < resultLength; ++i) {
          array[i] = this.get(start + i);
        }
        return new ArrayList(array);
      },
      toArray: function () {
        var array = new Array(this.length);
        this.forEach(function (element, index) {
          array[index] = element;
        });
        return array;
      },
      tryFirstIndexOf: function (element) {
        for (var i = 0; i < this.length; ++i)
          if (this.get(i) === element)
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
      'slice': internal.slice,
      'toArray': internal.toArray,
      'tryFirstIndexOf': internal.tryFirstIndexOf
    };
    return js.objects.extend(internal, exported, extensions);
  }
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