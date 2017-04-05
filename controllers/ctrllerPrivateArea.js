var app = angular.module('privateArea', ['ui.materialize'])
app.controller('adminWeb', ['$scope','$http','$window', function($scope,$http,$window){

// JSON.stringify(groupSelected, null, 2)
var groupList = {}

$scope.showProductLimitTo = 4

	loadPage = function() {
		$scope.btnProductSave = true
		refreshGroupList()
		$scope.btnEditGroup = false
		$scope.btnDeleteGroup = false
		$scope.btnCancelGroup = false
		$scope.btnUpdateGroup = false
		$scope.btnCreateGroup = true
		refreshUsersList()
		$scope.btnUserSave = true
		$scope.btnEditUserSave = false
		$scope.btnUserCancel = false
		loadProductList()
		refreshCarrouselList()
		$scope.btnItemSave = true
		$scope.btnEditItemSave = false
		$scope.btnItemCancel = false
	}

  $scope.loadChangeSelect = function(){
  	$scope.btnEditGroup = true
		$scope.btnDeleteGroup = true
		$scope.btnCancelGroup = true
		$scope.btnUpdateGroup = false
		$scope.btnCreateGroup = false
  }

  var loadProductList = function(){
		$http({method:'GET',url:'/product'}).success(function(data,status,headers,config) {
			if(data){
				$scope.productList = data
			} else {
				console.log('ERROR data')
			}
		})
	}

	$scope.createGroup = function(groupName){

		if(groupName !== undefined && groupName != ""){

			var subGroupArray = []
			getChip = $window.chips

			for(i=0; i < getChip.length; i++){
				subGroupArray[i]=getChip[i].tag
			}

			$http({ method:'POST', url:'/group',data:{group:$scope.groupName, subgroup:subGroupArray} }).success(function(data,status,headers,config){
				if(data){
					$scope.groupName = ""
					refreshGroupList()
				} else {
					console.log('ERROR data')
				}
			})
			//Clean chips array materialize
			resetChip()
		} else {
			alert("Grupo no puede estar en blanco")
		}
	}

	$scope.loadChangeSelectProduct = function(){
		// console.log("valor seleccionado " + $scope.groupsNewProuct)
		items = findIndexSubGroups($scope.groupsNewProuct)
		// console.log(JSON.stringify(items, null, 2))
		$scope.subgroupNewProduct = items.subitems
	}

	refreshGroupList = function() {
		$http({ method:'GET', url:'/group' }).success(function(data,status,headers,config){
			if(data){
				// console.log(data)
				groupList = data
				// console.log('group list actualizado a ' + groupList)
				$scope.groupList = data
			} else {
				console.log('ERROR data')
			}
		})
	}

  // Find index from a Group
	function findIndexSubGroups(groupSelected) {
		for (var i=0; i<groupList.length; i++) {
			if(groupList[i].groupname == groupSelected) {
				var indexFinded = groupList[i]._id,
						subGroupFinded = groupList[i].subgroupitems
				// console.log(indexFinded + ' and ' + subGroupFinded)
				return { index:indexFinded , subitems: subGroupFinded }
			}
		}
	}

	$scope.editGroup = function(groupSelected){

		item = findIndexSubGroups(groupSelected)

		$scope.btnEditGroup = false
		$scope.btnDeleteGroup = false
		$scope.btnCancelGroup = true
		$scope.btnUpdateGroup = true
		$scope.btnCreateGroup = false
		$scope.groupName = groupSelected
		$scope.groupId = item.index
		// console.log('probando id '+ item.index)
		// console.log('probando subgrupos '+item.subitems)
		$scope.itemsSubGroup = item.subitems
		// Send data to jquery
		loadChips(item.subitems)
	}

	$scope.cancelGroup = function(){
		$scope.btnEditGroup = false
		$scope.btnDeleteGroup = false
		$scope.btnCancelGroup = false
		$scope.btnUpdateGroup = false
		$scope.btnCreateGroup = true
		$scope.groupName = ""
		$scope.groupSelected = ""
		cleanChips()
	}

	$scope.updateGroup = function(id) {

		var newChips = checkChips(),
			  subGroupArray = []

		for(i=0; i < newChips.length; i++){
			subGroupArray[i]=newChips[i].tag
		}

		$http({ method:'PUT', url:'/group/'+id, data:{ group:$scope.groupName, subgroup:subGroupArray} }).success(function(data,status,headers,config){
			if(data){
				console.log('guardado el dato ' + data)
			} else {
				console.log('ERROR data')
			}
		})

		refreshGroupList()
		$scope.btnEditGroup = false
		$scope.btnDeleteGroup = false
		$scope.btnCancelGroup = false
		$scope.btnUpdateGroup = false
		$scope.btnCreateGroup = true
		$scope.groupName = ""
		cleanChips()
	}

	$scope.deleteGroup = function(groupSelected){

		item = findIndexSubGroups(groupSelected)

		$http({ method:'DELETE', url:'/group/'+item.index }).success(function(data,status,headers,config){
			refreshGroupList()
			$scope.btnEditGroup = false
			$scope.btnDeleteGroup = false
			$scope.btnCancelGroup = false
			$scope.btnUpdateGroup = false
			$scope.btnCreateGroup = true
			if(data){
				console.log('deleted')
			} else {
				console.log('ERROR data')
			}
		})
		refreshGroupList()
	}


// USERS API

	refreshUsersList = function() {

		$http({ method:'GET', url:'/user' }).success(function(data,status,headers,config){
			if(data){
				// console.log(data)
				groupUsersList = data
				// console.log('group users list actualizado a ' + groupUsersList)
				$scope.groupUsersList = data
			} else {
				console.log('ERROR data')
			}
		})
	}

	$scope.saveUser = function(user_name, password){

		if(user_name !== undefined && user_name.length != 0 && password !== undefined && password != 0){

			$http({ method:'POST', url:'/user',data:{name:user_name, password:password} }).success(function(data,status,headers,config){
				if(data){
					$scope.user_name = ""
					$scope.password = ""
					refreshUsersList()
				} else {
					console.log('ERROR data')
				}
			})
		} else {
			console.log("data in blank")
		}
	}

	$scope.editUser = function(id,name,password){
		$scope.user_name = name
		$scope.password = password
		$scope.usr_id = id
		$scope.btnUserSave = false
		$scope.btnEditUserSave = true
		$scope.btnUserCancel = true
	}

	cancelEditUser = function(){
		$scope.user_name = ""
		$scope.password = ""
		$scope.usr_id = ""
		$scope.btnUserSave = true
		$scope.btnEditUserSave = false
		$scope.btnUserCancel = false
	}

	$scope.cancelEditUser = function() {
		cancelEditUser()
	}

	$scope.saveEditUser = function(usrId,user_name,password){
		if(user_name !== undefined && user_name.length != 0 && password !== undefined && password != 0){

			$http({ method:'PUT', url:'/user/'+usrId,data:{name:user_name, password:password} }).success(function(data,status,headers,config){
				if(data){
					$scope.user_name = ""
					$scope.password = ""
					$scope.usr_id = ""
					cancelEditUser()
					refreshUsersList()
				} else {
					console.log('ERROR data')
				}
			})
		} else {
			console.log("data in blank")
		}
	}

	$scope.setDeleteUser = function(id) {
		// send id to confirm
		$scope.userToDelete = id
	}

	$scope.deleteUser = function(usrId){
		console.log(usrId)
		$http({ method:'DELETE', url:'/user/'+usrId}).success(function(data,status,headers,config){
			if(data){
				refreshUsersList()
			} else {
				console.log('ERROR data')
			}
		})

	}





	refreshCarrouselList = function() {
		$http({ method:'GET', url:'/carrousel' }).success(function(data,status,headers,config){
			if(data){
				$scope.groupCarrouselList = data
			} else {
				console.log('ERROR data')
			}
		})
	}

	$scope.saveItem = function(title, detail){
		// if(title !== undefined && title != "" && detail !== undefined && detail != ""){
		//
		// 	$http({ method:'POST', url:'/carrousel',data:{title:title, detail:detail} }).success(function(data,status,headers,config){
		// 		if(data){
		// 			$scope.item_title = ""
		// 			$scope.item_detail = ""
		// 			$scope.photoCarrousel = ""
		// 			refreshCarrouselList()
		// 		} else {
		// 			console.log('ERROR data')
		// 		}
		// 	})
		// } else {
		// 	console.log("data in blank")
		// }
		console.log('entramos sin hacer nada en angular')
	}

	$scope.editItem = function(id,title,detail){
		$scope.item_title = title
		$scope.item_detail = detail
		$scope.item_id = id
		$scope.btnItemSave = false
		$scope.btnEditItemSave = true
		$scope.btnItemCancel = true
	}

	cancelEditItemFn = function(){
		$scope.item_title = ""
		$scope.item_detail = ""
		$scope.item_id = ""
		$scope.btnItemSave = true
		$scope.btnEditItemSave = false
		$scope.btnItemCancel = false
	}

	$scope.cancelEditItem = function() {
		cancelEditItemFn()
	}

	$scope.saveEditItem = function(itemId,title,detail){
		if(title !== undefined && title != "" && detail !== undefined && detail != ""){

			$http({ method:'PUT', url:'/carrousel/'+itemId,data:{title:title, detail:detail} }).success(function(data,status,headers,config){
				if(data){
					$scope.item_title = ""
					$scope.item_detail = ""
					$scope.item_id = ""
					cancelEditItemFn()
					refreshCarrouselList()
				} else {
					console.log('ERROR data')
				}
			})
		} else {
			console.log("data in blank")
		}
	}

	$scope.setDeleteItem = function(id) {
		// send id to confirm
		$scope.itemToDelete = id
	}

	$scope.deleteItem = function(itemId){
		console.log(itemId)
		$http({ method:'DELETE', url:'/carrousel/'+itemId}).success(function(data,status,headers,config){
			if(data){
				refreshCarrouselList()
			} else {
				console.log('ERROR data')
			}
		})

	}






	$scope.editProduct = function(productId){
		// console.log("edit "+productId)
		expand()
		$http({ method:'GET', url:'/product/' + productId }).success(function(data,status,headers,config){
			if(data){
				$scope.btnProductSave = false
				$scope.btnProductUpdate = true
				$scope.btnProductCancel= true

		    // console.log(data)
				var productFinded = data

				$scope.productIdEdit = data._id
				$scope.groupsNewProuct = data.group
				$scope.subGroupNewProduct = data.subgroup
				$scope.productName = data.name
				$scope.productPrice = data.price
				$scope.productDescription = data.description
				$scope.productExist = data.exist
				$scope.productOutstanding = data.outstanding
				$scope.productPhotos = data.photos
			} else {
				console.log('ERROR data')
			}
		})
	}

	$scope.productUpdateSave = function(id,group,subgroup,name,price,description,exist,outstanding,photos) {
		console.log(id+' - '+group+' - '+subgroup+' - '+name+' - '+price+' - '+description+' - '+exist+' - '+outstanding+' - '+photos)
		$http({ method:'PUT', url:'/product/'+id,
			data:{group:group,
						subgroup:subgroup,
						name:name,
						price:price,
						description: description,
						exist: exist,
						outstanding: outstanding,
						photos: photos} }).success(function(data,status,headers,config){
			if(data){
				$scope.productIdEdit = ""
				$scope.groupsNewProuct = ""
				$scope.subGroupNewProduct = ""
				$scope.productName = ""
				$scope.productPrice = ""
				$scope.productDescription = ""
				$scope.productExist = ""
				$scope.productOutstanding = ""
				$scope.productPhotos = ""
				$scope.btnProductSave = true
				$scope.btnProductUpdate = false
				$scope.btnProductCancel= false
				expand()
				loadProductList()
			} else {
				console.log('ERROR data')
			}
		})
	}

	$scope.productUpdateCancel = function(){
		$scope.btnProductSave = true
		$scope.btnProductUpdate = false
		$scope.btnProductCancel= false
		$scope.groupsNewProuct = ""
		$scope.subGroupNewProduct = ""
		$scope.productName = ""
		$scope.productPrice = ""
		$scope.productDescription = ""
		$scope.productExist = ""
		$scope.productOutstanding = ""
	}

	$scope.setDeleteProduct = function(id) {
		// send id to confirm
		console.log('si pasa el dato del producto ' + id)
		$scope.productToDelete = id
	}

	$scope.deleteProduct = function(productId){
		console.log(productId)
		$http({ method:'DELETE', url:'/product/'+productId}).success(function(data,status,headers,config){
			if(data){
				loadProductList()
			} else {
				console.log('ERROR data')
			}
		})
	}

	// Load page init
	loadPage()

}])
