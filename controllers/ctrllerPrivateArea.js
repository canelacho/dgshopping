var app = angular.module('privateArea', ['ui.materialize'])
app.controller('adminWeb', ['$scope','$http','$window', function($scope,$http,$window){

// JSON.stringify(groupSelected, null, 2)
var groupList = {}

	loadPage = function() {
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
	}

  $scope.loadChangeSelect = function(){
  	$scope.btnEditGroup = true
		$scope.btnDeleteGroup = true
		$scope.btnCancelGroup = true
		$scope.btnUpdateGroup = false
		$scope.btnCreateGroup = false
  }

	$scope.createGroup = function(groupName){ 

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
	} 

	refreshGroupList = function() {
		console.log('refrescando')
		console.log('actual grupo = ' + groupList)
		$http({ method:'GET', url:'/group' }).success(function(data,status,headers,config){
			if(data){
				console.log(data)
				groupList = data
				console.log('group list actualizado a ' + groupList)
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
				console.log(indexFinded + ' and ' + subGroupFinded)
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
		console.log('probando id '+ item.index)
		console.log('probando subgrupos '+item.subitems)
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

	$scope.updateGroup = function(id) {
		
		var subGroupArray = []
		getChip = $window.chips
		for(i=0; i < getChip.length; i++){
			subGroupArray[i]=getChip[i].tag
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



	refreshUsersList = function() {
		
		$http({ method:'GET', url:'/user' }).success(function(data,status,headers,config){
			if(data){
				console.log(data)
				groupUsersList = data
				console.log('group users list actualizado a ' + groupUsersList)
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

	// Load page init
	loadPage()

}])
