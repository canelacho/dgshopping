var app = angular.module('generalView', [])
app.controller('list-products', ['$scope','$http','$window', function($scope,$http,$window) {
	
	var loadProductList = function(){
		$http({method:'GET',url:'/product'}).success(function(data,status,headers,config) {
			if(data){
				$scope.productList = data 
			} else {
				console.log('ERROR data')
			}
		})
	}

	loadProductList()


}])