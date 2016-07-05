var authService = angular.module("authServiceModule", []);

authService.factory("authService", function ($http) {
    return function(){
        var token;
        function login(userName, password){
            $http({
                method: 'POST',
                url: 'localhost:8080/login',
                data: {"userName": userName, "password": password}
            }).then(function(data, status, headers){
                token = headers("Authorization");
            });
        };

        function logout(){
            token = "";
        };

        function getHttpContext() {
            return $http({headers: {'Authorization': token}})
        }

        return {login: login, logout: logout, getHttpContext: getHttpContext};
    }
});

authService.factory("authServiceInterface", function ($q) {
    return function authFunction(){
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

        return authFunction;
    }
});

