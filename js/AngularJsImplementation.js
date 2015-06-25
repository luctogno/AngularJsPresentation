/* jshint ignore:start */

//Implementazione spicciola delle parti di AngularJS: Scope e Controller

var $parse = function (expression) {
  var result = function (scope) {
    return scope[expression];
  };

  result.assign = function (scope, newValue) {
    scope[expression] = newValue;
  };

  return result;
};

function Scope() {
  this.$$watchers = [];
}

Scope.prototype.$watch = function (watcher, listenerFn) {
  var watcherFn;

  if (typeof watcher == 'string') {
    watcherFn = $parse(watcher);
  } else {
    watcherFn = watcher;
  }

  this.$$watchers.push({
    watcherFn: watcherFn,
    listenerFn: listenerFn
  });
};

Scope.prototype.$digest = function () {
  this.$$watchers.forEach(function (watch) {
    var newValue = watch.watcherFn(this);
    var oldValue = watch.last;
    if (newValue != oldValue) {
      watch.listenerFn(newValue, oldValue, this);
      watch.last = newValue;
    }
  }.bind(this));
};

Scope.prototype.$apply = function (exprFn) {
  try {
    exprFn();
  } finally {
    this.$digest();
  }
};

var $$directives = {};

var $directive = function (name, directiveFn) {
  if (directiveFn) {
    $$directives[name] = directiveFn;
  }
  return $$directives[name];
};

var $compile = function (element, scope) {
  element.children.forEach = Array.prototype.forEach;
  element.attributes.forEach = Array.prototype.forEach;

  element.children.forEach(function (child) {
    $compile(child, scope);
  });

  element.attributes.forEach(function (attribute) {
    var directiveFn = $directive(attribute.name);
    if (directiveFn) {
      directiveFn(scope, element, element.attributes);
    }
  });
};

$directive('ng-bind', function (scope, element, attributes) {
  scope.$watch(attributes['ng-bind'].value, function (newValue) {
    element.innerHTML = newValue;
  });
});

$directive('ng-model', function (scope, element, attributes) {
  // TWO-WAY data binding
  scope.$watch(attributes['ng-model'].value, function (newValue) {
    element.value = newValue;
  });
  
  // aggiornamento del componente (secondo data-binding)
  element.addEventListener('keyup', function () {
    scope.$apply(function () {
      $parse(attributes['ng-model'].value).assign(scope, element.value);
    });
  });
});


// fine definizione

//Inizializzazione di Angular (BOOTSTRAP)

//console.log($$directives);

var rootScope = new Scope();

$compile(document.body, rootScope);


//parte specifica della pagine, 
//messa qui per evitare l'inizializzazione del modulo e il controller

rootScope.$watch('title', function (newValue, oldValue) {
  console.log('listened title', oldValue, '->', newValue);
});

rootScope.$apply(function () {
  rootScope.title = 'AngularJS is Hard';
  rootScope.name = 'World';
});

setTimeout(function () {
  rootScope.$apply(function () {
    rootScope.title = 'AngularJS is easy !!';
  });
}, 5000);

/* jshint ignore:end */