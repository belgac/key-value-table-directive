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