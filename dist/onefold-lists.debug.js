/**
 * @license Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
;(function(factory) {
    if (typeof define === 'function' && define['amd'])
        define([], factory);
    else
        window['onefold-lists'] = factory();
} (function() {
/**
 * Copyright (c) 2015, Ben Schulz
 * License: BSD 3-clause (http://opensource.org/licenses/BSD-3-Clause)
 */
var onefold_js, onefold_lists_internal, onefold_lists_lists, onefold_lists;
onefold_js = function () {
  var onefold_js_arrays, onefold_js_functions, onefold_js_objects, onefold_js_strings, onefold_js_internal, onefold_js;
  onefold_js_arrays = function () {
    function naturalComparator(a, b) {
      return a && typeof a.valueOf === 'function' && b && typeof b.valueOf === 'function' ? a.valueOf() <= b.valueOf() ? a.valueOf() < b.valueOf() ? -1 : 0 : 1 : a <= b ? a < b ? -1 : 0 : 1;
    }
    function stableSort(source, comparator, sortSource) {
      var isChrome = !!window['chrome'];
      var nativeSortIsStable = !isChrome;
      return nativeSortIsStable ? stableSortNative(source, comparator, sortSource) : stableSortCustom(source, comparator, sortSource);
    }
    function stableSortNative(source, comparator, sortSource) {
      var destination = sortSource === true ? source : source.slice();
      destination.sort(comparator);
      return destination;
    }
    function stableSortCustom(source, comparator, sortSource) {
      var length = source.length;
      var indexes = new Array(length);
      var destination = new Array(length);
      var i;
      // TODO performance benchark: would it be better copy source via .slice()?
      //      i would hope this does pretty much the same as .slice() but we give
      //      out-of-order execution the chance to absorb more cache misses until
      //      the prefetcher kicks in
      for (i = 0; i < length; ++i) {
        indexes[i] = i;
        destination[i] = source[i];
      }
      if (sortSource === true) {
        var tmp = source;
        source = destination;
        destination = tmp;
      }
      indexes.sort(function (a, b) {
        var byOrdering = comparator(source[a], source[b]);
        return byOrdering || a - b;
      });
      for (i = 0; i < length; ++i)
        destination[i] = source[indexes[i]];
      return destination;
    }
    return {
      contains: function (array, value) {
        return array.indexOf(value) >= 0;
      },
      flatMap: function (array, mapping) {
        return Array.prototype.concat.apply([], array.map(mapping));
      },
      stableSort: function (array, comparator) {
        return stableSort(array, comparator || naturalComparator, true);
      }
    };
  }();
  onefold_js_functions = function () {
    var constant = function (x) {
      return function () {
        return x;
      };
    };
    return {
      true: constant(true),
      false: constant(false),
      nop: constant(undefined),
      null: constant(null),
      zero: constant(0),
      constant: constant,
      identity: function (x) {
        return x;
      }
    };
  }();
  onefold_js_objects = function () {
    function hasOwn(owner, propertyName) {
      return Object.prototype.hasOwnProperty.call(owner, propertyName);
    }
    function forEachProperty(owner, action) {
      for (var propertyName in owner)
        if (hasOwn(owner, propertyName))
          action(propertyName, owner[propertyName]);
    }
    return {
      areEqual: function (a, b) {
        return a === b || !!(a && typeof a.valueOf === 'function' && b && typeof b.valueOf === 'function' && a.valueOf() === b.valueOf());
      },
      extend: function (target) {
        Array.prototype.slice.call(arguments, 1).forEach(function (source) {
          var keys = Object.keys(source);
          for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i];
            var descriptor = Object.getOwnPropertyDescriptor(source, key);
            if (descriptor !== undefined && descriptor.enumerable)
              Object.defineProperty(target, key, descriptor);
          }
        });
        return target;
      },
      forEachProperty: forEachProperty,
      hasOwn: hasOwn
    };
  }();
  onefold_js_strings = {
    convertCamelToHyphenCase: function (camelCased) {
      return camelCased.replace(/([A-Z])/g, function (match) {
        return '-' + match.toLowerCase();
      });
    },
    convertHyphenToCamelCase: function (hyphenCased) {
      return hyphenCased.replace(/-([a-z])/g, function (match) {
        return match[1].toUpperCase();
      });
    },
    format: function (formatString) {
      var args = arguments;
      return formatString.replace(/{(\d+)}/g, function (match, number) {
        var argumentIndex = parseInt(number, 10) + 1;
        return typeof args.length <= argumentIndex ? match : args[argumentIndex];
      });
    }
  };
  onefold_js_internal = function (arrays, functions, objects, strings) {
    return {
      arrays: arrays,
      functions: functions,
      objects: objects,
      strings: strings
    };
  }(onefold_js_arrays, onefold_js_functions, onefold_js_objects, onefold_js_strings);
  onefold_js = function (main) {
    return main;
  }(onefold_js_internal);
  return onefold_js;
}();

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

onefold_lists_lists = function (internal) {
  return {
    'newArrayList': internal.newArrayList,
    'listPrototype': internal.listPrototype
  };
}(onefold_lists_internal);
onefold_lists = function (main) {
  return main;
}(onefold_lists_lists);return onefold_lists;
}));