var app = angular.module('detailView', [])

app.controller('productDetail', ['$scope','$http','$window', function($scope,$http,$window){

var loadProductDetail = function(){

	var idProduct =  window.location.pathname.split('/').pop()

	$http({ method:'GET',url:'/product/' + idProduct }).success(function(data,status,headers,config) {
		if(data){
			$scope.productFinded = data 
			console.log(data)
		} else {
			console.log('ERROR data')
		}
	})
}

loadProductDetail()
}])
