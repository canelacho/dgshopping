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

	loadGroupList()
	loadProductList()


}])