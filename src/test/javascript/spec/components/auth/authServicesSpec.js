'use strict';

describe('Services Tests ', function () {

    beforeEach(module('hipster2App'));

    describe('Auth', function () {
        var $httpBackend, spiedLocalStorageService, authService, spiedAuthServerProvider;

        beforeEach(inject(function($injector, localStorageService, Auth, AuthServerProvider) {
            $httpBackend = $injector.get('$httpBackend');
            spiedLocalStorageService = localStorageService;
            authService = Auth;
            spiedAuthServerProvider = AuthServerProvider;
            //Request on app init
            $httpBackend.expectGET('i18n/en.json').respond(200, '');
            $httpBackend.expectGET('app/logout').respond(200, '');

            var req = 'protected/authentication_check.gif';
            var regex_friendly_req = req.replace(/\//g, '\\/');
            var expected = new RegExp(regex_friendly_req + '\\?cacheBuster=[0-9]+');
            $httpBackend.expectGET(expected).respond(200, '');
            $httpBackend.expectGET('components/navbar/navbar.html').respond({});
            $httpBackend.expectGET('app/main/main.html').respond({});
        }));
        //make sure no expectations were missed in your tests.
        //(e.g. expectGET or expectPOST)
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should call backend on logout then call authServerProvider.logout', function(){
            //GIVEN
            //Set spy
            spyOn(spiedAuthServerProvider, 'logout').and.callThrough();
            spyOn(spiedLocalStorageService, "clearAll").and.callThrough();

            //WHEN
            authService.logout();
            //flush the backend to "execute" the request to do the expectedGET assertion.
            $httpBackend.flush();

            //THEN
            expect(spiedAuthServerProvider.logout).toHaveBeenCalled();
            expect(spiedLocalStorageService.clearAll).toHaveBeenCalled();
        });

    });
});
