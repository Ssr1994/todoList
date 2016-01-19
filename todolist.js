var todoList = angular.module('todoList', ['ngAnimate', 'ngAria', 'ngMessages', 'ngMaterial']);

todoList.controller('mainController', ['$scope', function($scope) {
    $scope.todoInput = '';    
    $scope.date = new Date();
    $scope.todoItems = [{todo: "test", completed: true}];
    $scope.addItem = function() {
        if ($scope.todoInput) {
            $scope.todoItems.push({ todo: $scope.todoInput, completed: false});
            $scope.todoInput = '';
        }
    };
    $scope.removeItem = function(item) {
        var index = $scope.todoItems.indexOf(item);
        if (index >= 0) $scope.todoItems.splice(index, 1);
    };
    $scope.toggleCompleted = function(item) {
        item.completed
    };
}]);