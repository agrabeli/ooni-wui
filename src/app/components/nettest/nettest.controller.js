NettestController.$inject = ['$stateParams', '$scope', '$http', '$window'];
function NettestController($stateParams, $scope, $http,  $window) {

  $http.get('/api/nettest')
    .then(function(response){
      $scope.netTests = response.data;
      if ($stateParams.testName) {
        $scope.runNetTest($stateParams.testName);
      }
    }, function(error){
      console.log(error);
    });

  $scope.runNetTest = function(testName) {
    if ($scope.netTests[testName]) {
      $scope.selectedNetTest = $scope.netTests[testName];
      $window.scrollTo(0, 0);
    }
  }

  $scope.startNetTest = function() {
    var options = {};
    $window.scrollTo(0, 0);
    angular.forEach($scope.selectedNetTest.arguments, function(value, key) {
      if (value.value != null) {
        options[key] = ''+value.value;
      } else {
        options[key] = value.value;
      }
    });

    $http
      .post(
        '/api/nettest/'+$scope.selectedNetTest.id+'/start',
        options
      )
      .then(function(response){
        $scope.selectedNetTest = undefined;
      }, function(error){
        $scope.selectedNetTest = undefined;
      });
  }


}

module.exports = NettestController;
