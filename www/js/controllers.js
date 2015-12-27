angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

  })

  .controller('NodesCtrl', function ($scope, $http) {
    $scope.init = function () {
      $scope.shouldShowReorder = true;
      $scope.shouldShowDelete = true;
    };
    $scope.toggleShowDelete = function () {
      $scope.shouldShowDelete = !$scope.shouldShowDelete;
      //$scope.shouldShowReorder = false;
    };
    $scope.clearFilter = function () {
      $scope.filterText = "";
      $scope.updateFilter();
    };
    $scope.updateFilter = function () {
      var target = $scope.filterText.toLowerCase();
      var filter = function (node) {
        return node.name().toLowerCase().indexOf(target) != -1;
      };
      //will not cause update
      //$scope.loadNodes(filter);

    };
    $scope.createNewNode = function () {
    };
    $scope.loadNodes = function () {
      connection_visualizer.NodeManager.checkLoad();
      if (connection_visualizer.NodeManager.numberOfNodes() == 0) {
        connection_visualizer.NodeManager.createNode("Beeno");
        connection_visualizer.NodeManager.createNode("Katie");
      }
      $scope.nodes = connection_visualizer.NodeManager.toArray();
    };
    $scope.deleteNode = function (node) {
      $scope.nodes.splice($scope.nodes.indexOf(node), 1);
    };
    $scope.reorderNode = function (node, $fromIndex, $toIndex) {
      $scope.nodes.splice($fromIndex, 1);
      $scope.nodes.splice($toIndex, 0, node);
    };
    $scope.init();
  })

  .controller('NodeCtrl', function ($scope, $stateParams) {
  });
