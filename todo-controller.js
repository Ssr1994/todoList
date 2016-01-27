(function() {
    angular.module('todoList').controller('mainController', ['$scope', function($scope) {
        $scope.date = new Date();
        $scope.minDate = new Date(
            $scope.date.getFullYear(),
            $scope.date.getMonth(),
            $scope.date.getDate());
        $scope.maxDate = new Date(
            $scope.date.getFullYear(),
            $scope.date.getMonth(),
            $scope.date.getDate() + 14);
        $scope.todoInput = "";
        $scope.todoItems = [];
        for (var d = new Date(), i = 0; i <= 7; i++) {
            d.setDate($scope.date.getDate() - i);
            var todos = JSON.parse(localStorage.getItem(d.toDateString())) || [];
            $scope.todoItems = $scope.todoItems.concat(todos);
        }
        
        $scope.addItem = function() {
            $scope.todoItems.push({todo: $scope.todoInput, completed: false});
            $scope.todoInput = "";
        }
        
        $scope.removeItem = function(item) {
            var index = $scope.todoItems.indexOf(item);
            if (index >= 0)
                $scope.todoItems.splice(index, 1);
        }
        
        $scope.onDateChange = function(oldDate) {
            localStorage.setItem(oldDate, JSON.stringify($scope.todoItems));
            $scope.todoItems = JSON.parse(localStorage.getItem($scope.date.toDateString())) || [];
        }
    }]);
})();