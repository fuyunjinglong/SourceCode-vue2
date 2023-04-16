(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  // 高类聚，低耦合
  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);
      this.walk(data);
    }
    _createClass(Observer, [{
      key: "walk",
      value: function walk(data) {
        // 遍历一遍数据，添加响应式
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);
    return Observer;
  }();
  function defineReactive(data, key, value) {
    // 属性全部被重写
    // 递归代理属性
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newV) {
        observe(value);
        value = newV === value ? value : newV;
      }
    });
  }
  function observe(data) {
    // 数据响应式
    if (_typeof(data) !== 'object' || data === null) {
      return; // 如果不是对象，就不处理
    }
    /**
    * Class方法扩展与构造函数方法扩展比较：
    * 1.Class用于扩展方法耦合的场景，但扩展方法都在class内部
    * 2.构造函数用于外部方法的任意扩展，使用原型属性继承扩展方法，可以无限扩展，不受约束
    */
    // 这里采用Class类
    return new Observer(data);
  }

  function initState(vm) {
    var options = vm.$options;
    if (options.data) {
      initData(vm);
    }
  }
  function initData(vm) {
    var data = vm.$options.data;
    // 判断是否为函数，如果是则执行函数获取返回值。
    // 代理后，添加到vm实例上_data
    data = vm._data = typeof data === 'function' ? data.call(vm) : data;
    // 观察数据,实现响应式
    observe(data);
    console.log(data);
  }

  function initMixin(Vue) {
    // 扩展Vue的方法
    Vue.prototype._init = function (options) {
      // 绑定所有选项参数到实例上，后续所有的扩展方法都可以拿到这些选项
      var vm = this;
      // $表示Vue自己的属性参数
      vm.$options = options;
      // 初始化数据，如prop,data,methods,computed,watch
      initState(vm);
    };
  }

  /**
   * Class方法扩展与构造函数方法扩展比较：
   * 1.Class用于扩展方法耦合的场景，但扩展方法都在class内部
   * 2.构造函数用于外部方法的任意扩展，使用原型属性继承扩展方法，可以无限扩展，不受约束
   */
  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue); // 扩展方法通过传入Vue构造函数，通过原形添加方法，并分文件管理

  return Vue;

}));
//# sourceMappingURL=vue.js.map
