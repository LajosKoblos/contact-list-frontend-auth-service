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
            deferred.reject(createServerErrorObject(reason));
        });

        return deferred.promise;
    };
    
    function getTokenId(){
        return token;
    };

    function logout() {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:8080/logout',
            data: {"tokenId" : getTokenId()}
        }).then(function (result) {
            deferred.resolve(result);
            token = null;
        }, function (reason) {
            deferred.reject(createServerErrorObject(reason));
        });

        return deferred.promise;

    };

    function createServerErrorObject(error) {
        return {
            message: error.data.message,
            status: error.status,
            fields: error.data.fields,
            httpResponse: error.config
        };
    }

    return {login: login, logout: logout, getTokenId: getTokenId};
});

