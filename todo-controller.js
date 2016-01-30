(function() {
    angular.module('todoList')
        .controller('todoController', ['$scope', '$mdDialog', todoController]);
    
    function todoController($scope, $mdDialog) {
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
            var todos = JSON.parse(localStorage.getItem(d.toDateString()));
            if (todos && todos.constructor == Array) {
                $scope.todoItems = todos.concat($scope.todoItems);
                localStorage.removeItem(d.toDateString());
            }
        }
        
        $scope.storeTodos = function(date) {
            if (date instanceof Date)
                date = date.toDateString();
            if ($scope.todoItems.length > 0)
                localStorage.setItem(date, JSON.stringify($scope.todoItems));
            else
                localStorage.removeItem(date);
        };
        
        $scope.storeTodos($scope.date);
        
        $scope.addItem = function() {
            $scope.todoItems.push({todo: $scope.todoInput, completed: false});
            $scope.storeTodos($scope.date);
            $scope.todoInput = "";
        };
        
        $scope.removeItem = function(item) {
            var index = $scope.todoItems.indexOf(item);
            if (index >= 0) {
                $scope.todoItems.splice(index, 1);
                $scope.storeTodos($scope.date);
            }
        };
        
        $scope.showHelp = function(ev) {
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'help.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true
            });
        };
        
        $scope.onDateChange = function(oldDate) {
            $scope.storeTodos(oldDate);
            $scope.todoItems = JSON.parse(localStorage.getItem($scope.date.toDateString())) || [];
        }
        
        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
        }
    }
})();