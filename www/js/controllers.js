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
		 ngFB.login({scope: 'email'}).then(
		 	function (response) {
		 		if(response.status === 'connected') {
		 			//console.log('Facebook login succeeded');
		 			//$scope.closeLogin();
		 			alert('Facebook login succeeded');
		 			$state.go('app.home');
		 		} else {
		 			alert('Facebook login failed');
		 		}
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

.controller('CreateAccountCtrl', function($scope, $state, alessioService){
	$scope.users = [];
	$scope.user = {};

	function getAllUsers() {
		alessioService.getUsers()
		.then(function (result) {
			$scope.users = result.data.data;
		});
	}

	function addUser () {
		alessioService.addUser($scope.user)
		.then(function(result) {
			$scope.user= {};
			getAllUsers();
		});
	}

	$scope.deleteUser = function(id) {
		alessioService.deleteUser(id)
		.then(function (result) {
			getAllUsers();
		});
	}

	getAllUsers();

	$scope.doSignUp = function(){
		/*
		alert($scope.user.name);
		alert($scope.user.surename);
		alert($scope.user.username);
		alert($scope.user.email);
		*/
		if ($scope.user.name !="" && $scope.user.surename != "" && $scope.user.username != "" && $scope.user.email != "") {
			//alert($scope.user.surename);
			addUser();
			console.log("doing sign up");
			$state.go('app.home');
		} else{
			alert("Correct your user informati");
		};
	};
})

.controller('WelcomeBackCtrl', function($scope, $ionicModal, $state, alessioService){
	$scope.user = {};
	$scope.users = [];

	$scope.doLogIn = function(){
		alessioService.getUsers()
		.then(function (result) {
			$scope.users = result.data.data;
			var x;
			for(x in $scope.users) {
				if ($scope.users[x].username == $scope.user.username && $scope.users[x].password == $scope.user.password) {
					$state.go('app.home');
					break;
				} else if (x == $scope.users.length-1) {
					alert('There is no account! Please retry.');
				};
			}
		});
		console.log("doing log in");
	};
	/*
	$ionicModal.fromTemplateUrl('views/partials/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.forgot_password_modal = modal;
  });
*/
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
