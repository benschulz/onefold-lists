

/**
 * @namespace
 * @suppress {duplicate}
 */
var onefold = onefold || {};

/** @namespace */
onefold.lists = {};

/**
 * @template E
 * @param {Array<E>=} array
 * @returns {onefold.lists.List<E>}
 */
onefold.lists.newArrayList = function (array) {};

/**
 * @param {Object} extensions
 * @returns {Object}
 */
onefold.lists.listPrototype = function (extensions) {};

/**
 * @constructor
 * @template E
 */
onefold.lists.List = function () {};

/**
 * @type {number}
 */
onefold.lists.List.prototype.length;

/**
 * @param {E} value
 * @returns {boolean}
 */
onefold.lists.List.prototype.contains = function (value) {};

/**
 * @param {function(E):boolean} predicate
 * @returns {onefold.lists.List<E>}
 */
onefold.lists.List.prototype.filter = function (predicate) {};

/**
 * @param {function(E, number, onefold.lists.List<E>)} action
 * @returns {undefined}
 */
onefold.lists.List.prototype.forEach = function (action) {};

/**
 * @param {number} index
 * @returns {E}
 */
onefold.lists.List.prototype.get = function (index) {};

/**
 * @template I
 * @param {function(E, number, onefold.lists.List<E>):I} mapper
 * @returns {onefold.lists.List<I>}
 */
onefold.lists.List.prototype.map = function (mapper) {};

/**
 * @returns {onefold.lists.List<E>}
 */
onefold.lists.List.prototype.readOnly = function () {};

/**
 * @param {function(E, E):E} accumulator
 * @param {E=} identity
 * @returns {E}
 */
onefold.lists.List.prototype.reduce = function (accumulator, identity) {};

/**
 * @param {number=} beginIndex
 * @param {number=} endIndex
 * @returns {onefold.lists.List<E>}
 */
onefold.lists.List.prototype.slice = function (beginIndex, endIndex) {};

/**
 * @returns {Array<E>}
 */
onefold.lists.List.prototype.toArray = function () {};

/**
 * @param {E} value
 * @returns {number}
 */
onefold.lists.List.prototype.tryFirstIndexOf = function (value) {};