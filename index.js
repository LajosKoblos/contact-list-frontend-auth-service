var authService = angular.module("authServiceModule", []);
authService.factory("$httpWithProtection", function ($http, authService) {
    var http = function (config) {
        config.headers.Authorization = "Bearer " + authService.getTokenId();
        return $http(config);
    };
    return http;
});

authService.factory("authService", function ($http, $q) {
    var token;

    function login(userName, password) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:8080/login',
            data: {"userName": userName, "password": password}
        }).then(function (data) {
            token = data.data.tokenId;
            deferred.resolve();
        });

        return deferred.promise;
    };

    function getTokenId(){
        return token;
    };

    function logout() {
        token = null;
    };

    return {login: login, logout: logout, getTokenId: getTokenId};
});

authService.factory("authServiceInterface", function ($q) {
    return function authFunction() {
        var token;

        function login() {
            token = "bearer 0123456789"
        };

        function logout() {
            token = "";
        };

        function getHttpContext() {
            return $q({headers: {'Authorization': token}})
        }

        return authFunction;
    }
});

