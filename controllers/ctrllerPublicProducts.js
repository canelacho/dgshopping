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



app.controller('navController', ['$scope','$http','$window','$location', function($scope,$http,$window,$location) {

	var loadGroupList = function(){
		$http({method:'GET',url:'/group'}).success(function(data,status,headers,config) {
			if(data){
				//$scope.groupList = createList(data)
				$scope.groupList = data
			} else {
				console.log('ERROR data')
			}
		})
	}


	// $scope.findbysubgroup = function(subgroup){

	// 	$http({method:'GET',url:'/searching/'+subgroup}).success(function(data, status, headers, config){
	// 		if(data){
	// 			//window.location = '/search'
	// 			$scope.subgroupfinded = data[0].id
	// 			$scope.subgroupitemsfinded = data[1]
	// 		} else {
	// 			console.log('ERRR data')
	// 		}
	// 	})

	// }

	var findbysubgroup = function(subgroup){

		$http({method:'GET',url:'/searching/'+subgroup}).success(function(data, status, headers, config){
			if(data){
				//window.location = '/search'
				$scope.subgroupfinded = data[0].id
				$scope.subgroupitemsfinded = data[1]
			} else {
				console.log('ERRR data')
			}
		})

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


	// draw nav buttons of subgroups and expand list
	$scope.expand = function(groupname) {

		function findSubGrup (groupname) {
			var newArra = []
			for(var i=0;i< $scope.groupList.length; i++) {
				if ($scope.groupList[i].groupname == groupname ) {
					newArray = $scope.groupList[i].subgroupitems
				}
			}
			return newArray
		}

		$scope.showsubgroup = true
		
		$scope.subGroupActiveList = findSubGrup(groupname)

	}

	$scope.markview = function(){
		var url = $location.$$absUrl
		var palabra = url.split("/")
		palabra = palabra[palabra.length - 1]
		busqueda = palabra.split("?")
		objPalabra = {
			palabra : palabra,
			busqueda : busqueda
		}
		return objPalabra
	}()

	var limpiarCaracteres = function(palabraLimpiar) {
		//console.log(palabraLimpiar)
		if (palabraLimpiar !== undefined ) {
			var palabraLimpiar = (palabraLimpiar.split("%20").join(" "))
			return palabraLimpiar
		}
		// var arg = palabraLimpiar.split(" ", 2)
		
	}

	//console.log(limpiarCaracteres(objPalabra.busqueda[1]))
	findbysubgroup(objPalabra.busqueda[1])

}])
