var app = angular.module('generalView', [])
app.controller('list-products', ['$scope','$http','$window', function($scope,$http,$window) {

// Use to save how many products are on db
var cntProducts

$scope.setGroupPublic = function(value){
	$scope.searchByName = value
	$scope.valueLimitTo = cntProducts
}

$scope.showMoreProducts = function(){
	$scope.valueLimitTo = $scope.valueLimitTo + 4
}

$scope.showLessProducts = function(){
	$scope.valueLimitTo = $scope.valueLimitTo - 4
}

$scope.showAllProducts = function(){
	$scope.valueLimitTo = cntProducts
}

var loadProductList = function(){
	$http({method:'GET',url:'/product'}).success(function(data,status,headers,config) {
		if(data){
			$scope.productList = data
			var newData = []
			for(var i=0;i<data.length;i++){
				if (data[i].outstanding){
					newData.push(data[i])
				}
			}
			$scope.productOutstanding = newData
			$scope.productList = newData
			// set cnt of products on db
			cntProducts = data.length
			$scope.valueLimitTo = 100
		} else {
			console.log('ERROR data')
		}
	})
}

loadProductList()

}])



app.controller('navController', ['$scope','$http','$window', function($scope,$http,$window) {

	var loadGroupList = function(){
		$http({method:'GET',url:'/group'}).success(function(data,status,headers,config) {
			if(data){
				$scope.groupList = createList(data)
			} else {
				console.log('ERROR data')
			}
		})
	}

	var createList = function(data){
		var newData = []
		for(var i=0;i<data.length;i++){
			newData.push(data[i].groupname)
			if(data[i].subgroupitems.length > 0){
				for(var e=0;e<data[i].subgroupitems.length;e++){
			 		newData.push(data[i].subgroupitems[e])
				}
			}
		}
		return newData
	}

	var loadCarrousel  = function() {
		$http({method:'GET',url:'/carrousel'}).success(function(data,status,headers,config) {
			if(data){
				$scope.carrousel = data
			} else {
				console.log('ERROR data')
			}
		})
	}

	loadGroupList()
	loadCarrousel()

}])
