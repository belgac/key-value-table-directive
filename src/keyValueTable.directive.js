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