'use strict';

angular.module('sinf1212App.auth', ['sinf1212App.constants', 'sinf1212App.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
