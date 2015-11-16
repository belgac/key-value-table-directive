angular.module('keyvaluetable.directive', ['keyValueTable.controller','key-value-table.template'])
  .directive('keyvaluetable', keyValueTable)

function keyValueTable($templateCache) {

  var directive = {
    restrict: 'E',
    scope: {
      datatoparse: '=',
      parseddata: '=',
      model: '=',
      direction:'=',
      title:'='
    },
    controller:'keyValueTableController',
    controllerAs:'keyValueTable',
    bindToController: true,
    template: $templateCache.get('keyValueTable.view.html')
  };
  
  return directive;
}
keyValueTable.$inject = ["$templateCache"];;
angular.module('keyValueTable.controller', ['bsfaBoolean.directive','bgq.keyValueParser.factory'])
  .controller('keyValueTableController', keyValueTableController);
function keyValueTableController (bgqKeyValueParserFactory) {
  var vm = this;
  
  init();
  
  function init(){
    if (vm.datatoparse) {
      vm.data = bgqKeyValueParserFactory.parse(vm.datatoparse,vm.model);
    } else if (vm.parseddata) {
      vm.data = vm.parseddata
    }
  }
}
keyValueTableController.$inject = ["bgqKeyValueParserFactory"];;
angular.module("key-value-table.template", []).run(["$templateCache", function($templateCache) {$templateCache.put("keyValueTable.view.html","<div class=\"table-responsive\">\n  <table class=\"table table-striped\">\n    <thead>\n      <tr>\n        <th ng-if=\"keyValueTable.direction === \'horizontal\'\" ng-repeat=\"keyvalue in keyValueTable.data\">\n          {{keyvalue.label}}\n        </th>\n        <th ng-if=\"keyValueTable.direction === \'vertical\' && keyValueTable.title\" colspan=2>\n          {{keyValueTable.title}}\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr ng-if=\"keyValueTable.direction === \'horizontal\'\">\n        <td ng-repeat=\"keyvalue in keyValueTable.data\">\n           <span ng-if=\"!keyvalue.type\">\n             {{keyvalue.value}}\n           </span>\n          <span ng-if=\"keyvalue.type === \'boolean\'\">\n            <bsfaboolean value=\"keyvalue.value\"></bsfaboolean>\n          </span>\n          <span ng-if=\"keyvalue.type===\'number\' && keyvalue.subType===\'currency\'\">\n            {{keyvalue.value | currency : $}}\n          </span>\n        </td>\n      </tr>\n      <tr ng-if=\"keyValueTable.direction === \'vertical\'\" ng-repeat=\"keyvalue in keyValueTable.data\">\n        <th>\n          {{keyvalue.label}}\n        </th>\n        <td>\n          <span ng-if=\"!keyvalue.type\">\n             {{keyvalue.value}}\n           </span>\n          <span ng-if=\"keyvalue.type === \'boolean\'\">\n            <bsfaboolean value=\"keyvalue.value\"></bsfaboolean>\n          </span>\n          <span ng-if=\"keyvalue.type===\'number\' && keyvalue.subType===\'currency\'\">\n            {{keyvalue.value | currency : $}}\n          </span>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>");}]);
//# sourceMappingURL=key-value-table-directive.js.map
