

/** @namespace */
de.benshu.onefold.lists = {};

/**
 * @template E
 * @param {Array<E>=} array
 * @returns {de.benshu.onefold.lists.List<E>}
 */
de.benshu.onefold.lists.newArrayList = function (array) {};

/**
 * @param {Object} extensions
 * @returns {Object}
 */
de.benshu.onefold.lists.listPrototype = function (extensions) {};

/**
 * @constructor
 * @template E
 */
de.benshu.onefold.lists.List = function () {};

/**
 * @type {number}
 */
de.benshu.onefold.lists.List.prototype.length;

/**
 * @param {E} value
 * @returns {boolean}
 */
de.benshu.onefold.lists.List.prototype.contains = function (value) {};

/**
 * @param {function(E):boolean} predicate
 * @returns {de.benshu.onefold.lists.List<E>}
 */
de.benshu.onefold.lists.List.prototype.filter = function (predicate) {};

/**
 * @param {function(E, number, de.benshu.onefold.lists.List<E>)} action
 * @returns {undefined}
 */
de.benshu.onefold.lists.List.prototype.forEach = function (action) {};

/**
 * @param {number} index
 * @returns {E}
 */
de.benshu.onefold.lists.List.prototype.get = function (index) {};

/**
 * @template I
 * @param {function(E, number, de.benshu.onefold.lists.List<E>):I} mapper
 * @returns {de.benshu.onefold.lists.List<I>}
 */
de.benshu.onefold.lists.List.prototype.map = function (mapper) {};

/**
 * @returns {de.benshu.onefold.lists.List<E>}
 */
de.benshu.onefold.lists.List.prototype.readOnly = function () {};

/**
 * @param {function(E, E):E} accumulator
 * @param {E=} identity
 * @returns {E}
 */
de.benshu.onefold.lists.List.prototype.reduce = function (accumulator, identity) {};

/**
 * @param {number=} beginIndex
 * @param {number=} endIndex
 * @returns {de.benshu.onefold.lists.List<E>}
 */
de.benshu.onefold.lists.List.prototype.slice = function (beginIndex, endIndex) {};

/**
 * @returns {Array<E>}
 */
de.benshu.onefold.lists.List.prototype.toArray = function () {};

/**
 * @param {E} value
 * @returns {number}
 */
de.benshu.onefold.lists.List.prototype.tryFirstIndexOf = function (value) {};
