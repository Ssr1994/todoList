(function(){
    angular.module('todoList').controller('testController', ['$scope', function($scope) { 
        $scope.showWarning = (function() {
            var test = 'test';
            try {
                localStorage.setItem(test, test);
                localStorage.removeItem(test);
                return false;
            } catch(e) {
                return true;
            }
        })();
        
        $scope.hideWarning = function() {
            $scope.showWarning = false;
        }
    }])
})();