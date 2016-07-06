var authService = angular.module("authServiceModule", []);

authService.factory("$httpWithProtection", function ($http, authService) {
    var http = function (config) {
        config.headers = {};
        config.headers.Authorization = "Bearer " + authService.getTokenId();
        return $http(config);
    };
    return http;
});

authService.factory("authService", function ($http, $q) {
    var token;

    function login(userModel) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:8080/login',
            data: userModel
        }).then(function (result) {
            token = result.data.tokenId;
            deferred.resolve({tokenId: result.data.tokenId, role: result.data.role});
        }, function (reason) {
            deferred.reject(reason);
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

