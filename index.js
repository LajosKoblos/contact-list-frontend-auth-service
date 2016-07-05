var authService = angular.module("authServiceModule", []);

authService.factory("authService", function () {
    return {

    }
});

authService.factory("authServiceInterface", function ($http) {
    return function(){
        var token;
        function login(){
            token = "bearer 0123456789"
        };

        function logout(){
            token = "";
        };

        function getHttpContext() {
            return $http({headers: {'Authorization': token}})
        }
    }
});

