angular.module('alessio.controllers', ['ngOpenFB'])

// APP - RIGHT MENU
.controller('AppCtrl', function($scope, $ionicModal){
	
})

.controller('HomeCtrl', function($scope, $ionicActionSheet, $state){
	$scope.showLogOutMenu = function() {
		// Show the action sheet
		var hideSheet = $ionicActionSheet.show({
			//Here you can add some more buttons
			// buttons: [
			// { text: '<b>Share</b> This' },
			// { text: 'Move' }
			// ],
			destructiveText: 'Logout',
			titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
			cancelText: 'Cancel',
			cancel: function() {
				// add cancel code..
			},
			buttonClicked: function(index) {
				//Called when one of the non-destructive buttons is clicked,
				//with the index of the button that was clicked and the button object.
				//Return true to close the action sheet, or false to keep it opened.
				return true;
			},
			destructiveButtonClicked: function(){
				//Called when the destructive button is clicked.
				//Return true to close the action sheet, or false to keep it opened.
				$state.go('facebook-sign-in');
			}
		});

	};
})

.controller('WelcomeCtrl', function($scope, $ionicModal, $state , $timeout, ngFB){
	$scope.bgs = ["http://lorempixel.com/640/1136", "https://dl.dropboxusercontent.com/u/30873364/envato/ionFB/ion-fb-feed.gif"];
	$scope.fbLogin = function () {
		 ngFB.login({scope: 'email,read_stream, publish_actions'}).then(
		 	function (response) {
		 		if(response.status === 'connected') {
		 			console.log('Facebook login succeeded');
		 			$scope.closeLogin();
		 		} else {
		 			alert('Facebook login failed');
		 		}
		 		$state.go('app.home');
		 	});
	};
	$scope.facebookSignIn = function(){
		console.log("doing facebbok sign in");
		$state.go('app.home');
	};

	$ionicModal.fromTemplateUrl('views/partials/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

	$ionicModal.fromTemplateUrl('views/partials/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

  $scope.showPrivacyPolicy = function() {
    $scope.privacy_policy_modal.show();
  };

	$scope.showTerms = function() {
    $scope.terms_of_service_modal.show();
  };
})

.controller('CreateAccountCtrl', function($scope, $state){
	$scope.doSignUp = function(){
		console.log("doing sign up");
		$state.go('app.home');
	};
})

.controller('WelcomeBackCtrl', function($scope, $ionicModal, $state){
	$scope.doLogIn = function(){
		console.log("doing log in");
		$state.go('app.home');
	};

	$ionicModal.fromTemplateUrl('views/partials/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.forgot_password_modal = modal;
  });

  $scope.showForgotPassword = function() {
    $scope.forgot_password_modal.show();
  };

	$scope.requestNewPassword = function() {
    console.log("requesting new password");
		$state.go('app.home');
  };

  // //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
})

;
