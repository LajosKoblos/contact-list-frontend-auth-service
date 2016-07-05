var authService = angular.module("authServiceModule", []);

authService.factory("authService", function () {
    return {

    }
});

authService.factory("authServiceInterface", function ($q) {
    return function(){
        var token;
        function login(){
            token = "bearer 0123456789"
        };

        function logout(){
            token = "";
        };

        function getHttpContext() {
            return $q({headers: {'Authorization': token}})
        }
    }
});

