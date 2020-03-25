/**
 * This file contains the typescript version debouncing and throttling function.
 *
 * Acknowledgement: This code is borrowed from the util.js, which is in the same folder as this
 * file, and [Juejin.im](https://juejin.im/post/5c00f7fe51882516be2ee2fc)
 */

/**
 * @export
 *
 * @description Debounce function.
 * @description 函数防抖
 *
 * @param {Function} fn Function to be debounced.
 * @param {number} delay Time to wait before calling the function.
 * @param {*} scope Scope.
 * @param {boolean} [immediate=false] Flag indicating if we should call the function immediately.
 * @returns {Function}
 */

export function debounce(
  fn: Function,
  delay: number,
  scope: any,
  immediate: boolean = false
): Function {
  let timer: number = null;

  return function() {
    let context: any = scope || this;
    let args: IArguments = arguments;

    if (timer) {
      clearTimeout(timer);
    }

    if (immediate) {
      let callNow: boolean = !timer;

      timer = setTimeout(() => (timer = null), delay);

      if (callNow) {
        fn.apply(context, args);
      }
    } else {
      timer = setTimeout(() => fn.apply(context, args), delay);
    }
  };
}

/**
 * Mode of the throttling function.
 *
 * @enum {number}
 */
enum ThrottleMode {
  TimeStamp,
  Timer
}

/**
 * @export
 *
 * @description Throttling function.
 * @description 函数节流.
 *
 * @param {Function} fn Function to be throttled.
 * @param {number} threshold Time to wait before the function is called.
 * @param {*} scope Scope.
 * @param {ThrottleMode} [mode=ThrottleMode.TimeStamp] Mode of the throttle funciton.
 * @returns {Function}
 */
export function throttle(
  fn: Function,
  threshold: number,
  scope: any,
  mode: ThrottleMode = ThrottleMode.TimeStamp
): Function {
  return mode === ThrottleMode.TimeStamp
    ? throttleByTimestamp(fn, threshold, scope)
    : throttleByTimer(fn, threshold, scope);
}

/**
 * @export
 *
 * @description Timestamp version throttling function.
 * @description 节流函数 (时间戳版)
 *
 * @param {Function} fn Function to be throttled.
 * @param {number} threshold Time to wait before the function is called.
 * @param {*} scope Scope.
 * @returns {Function}
 */
export function throttleByTimestamp(
  fn: Function,
  threshold: number,
  scope: any
): Function {
  let prev: number = Date.now();

  return function() {
    let context: any = scope || this;
    let args: IArguments = arguments;
    let now: number = Date.now();

    if (now - prev > threshold) {
      prev = now;
      fn.apply(context, args);
    }
  };
}

/**
 * @export
 *
 * @description Timer version throttling function.
 * @description 节流函数 (定时器版)
 *
 * @param {Function} fn Function to be throttled.
 * @param {number} threshold Time to wait before the function is called.
 * @param {*} scope Scope.
 * @returns {Function}
 */
export function throttleByTimer(
  fn: Function,
  threshold: number,
  scope: any
): Function {
  let timer: number;

  return function() {
    let context: any = scope || this;
    let args: IArguments = arguments;

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, threshold);
    }
  };
}
