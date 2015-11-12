angular.module('keyValueTable.controller', ['bsfaBoolean.directive','bgq.keyValueParser.factory'])
  .controller('keyValueTableController', keyValueTableController);
function keyValueTableController (bgqKeyValueParserFactory) {
  var vm = this;
  
  init();
  
  function init(){
    vm.data = bgqKeyValueParserFactory.parse(vm.datatoparse,vm.model);
  }
}