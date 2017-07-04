var app = angular.module('company', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all company and show them
    $http.get('/api/company')
        .success(function (data) {
            $scope.companies = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    // delete item
    $scope.deleteCompany = function (id) {
        $http.delete('/api/company/' + id)
            .success(function (data) {
                $http.get('/api/company')
                    .success(function (data) {
                        $scope.companies = data;
                        console.log(data);
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
}