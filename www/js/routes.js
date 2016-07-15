angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



      .state('menu.home', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('cloud', {
    url: '/page3',
    templateUrl: 'templates/cloud.html',
    controller: 'cloudCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.janeDoe', {
    url: '/patient id=43567',
    views: {
      'side-menu21': {
        templateUrl: 'templates/janeDoe.html',
        controller: 'janeDoeCtrl'
      }
    }
  })

  .state('menu.patients', {
    url: '/page8patients',
    views: {
      'side-menu21': {
        templateUrl: 'templates/patients.html',
        controller: 'patientsCtrl'
      }
    }
  })

  .state('menu.tP53GeneVariants', {
    url: '/TP53',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tP53GeneVariants.html',
        controller: 'tP53GeneVariantsCtrl'
      }
    }
  })

  .state('menu.pIK3CAGeneVariants', {
    url: '/PIK3CA',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pIK3CAGeneVariants.html',
        controller: 'pIK3CAGeneVariantsCtrl'
      }
    }
  })

  .state('menu.bRAFGeneVariants', {
    url: '/BRAF',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bRAFGeneVariants.html',
        controller: 'bRAFGeneVariantsCtrl'
      }
    }
  })

  .state('menu.eGFRGeneVariants', {
    url: '/EGFR',
    views: {
      'side-menu21': {
        templateUrl: 'templates/eGFRGeneVariants.html',
        controller: ''
      }
    }
  })

  .state('menu.CDH1GeneVariants', {
    url: '/CDH1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/CDH1GeneVariants.html',
        controller: 'CDH1Ctrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/page1')



});
