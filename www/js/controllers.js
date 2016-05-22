angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('MahasiswaCtrl', function($scope,$state,$ionicPopup,$ionicModal, mahasiswaService){
    $scope.showData = function() {
      mahasiswaService.getAll().success(function(data) {
            $scope.mahasiswas = data;
        }).finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };
    $scope.showData();
    
    $scope.reload = function (){
        $state.go('tab.mahasiswa');
    };
    
    $scope.delete = function (datamhs){
        mahasiswaService.delete(datamhs.npm);
        $scope.mahasiswas.splice($scope.mahasiswas.indexOf(datamhs),1);
    };
    
    $ionicModal.fromTemplateUrl('tambah.html', function(modal){
        $scope.taskModal = modal;
	}, {
            scope : $scope,
            animation : 'slide-in-up'
        
	});
        
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
          };
	
	$scope.tambahModal = function(){
            $scope.datamhs={};
            $scope.taskModal.show();
	};
	
	$scope.batal = function(){
            $scope.taskModal.hide();
	};
        
	$scope.datamhs={};
    $scope.simpan = function (){
            if (!$scope.datamhs.npm){
                $scope.showAlert({
                    title: "Information",
                    message: "NPM Mohon Diisi"
                });
            }else if (!$scope.datamhs.nama_mhs){
                $scope.showAlert({
                    title: "Information",
                    message: "Nama Mahasiswa Mohon Diisi"
                });
            }else if(!$scope.datamhs.alamat_mhs){
                $scope.showAlert({
                    title: "Information",
                    message: "Alamat Mahasiswa Mohon Diisi"
                });
            }else if(!$scope.datamhs.id_jurusan){
                $scope.showAlert({
                    title: "Information",
                    message: "Jurusan Mohon Diisi"
                });
            }else{
                mahasiswaService.create({
                npm: $scope.datamhs.npm,
                nama_mhs: $scope.datamhs.nama_mhs,
                alamat_mhs: $scope.datamhs.alamat_mhs,
                id_jurusan: $scope.datamhs.id_jurusan
            }).success(function(data){
                $scope.showAlert({
                    title: "Information",
                    message: "Data Telah Tersimpan"
                    
                });
                    $scope.taskModal.hide();
                
            }); 
        }
	};
})

.controller('MahasiswaDetailCtrl', function($scope,$stateParams,$ionicPopup,$ionicModal,$state,mahasiswaService){
        
    $scope.showDataId = function() {
      mahasiswaService.getId($stateParams.mahasiswaNpm).success(function(datamhs) {
            $scope.datamhs = datamhs;
        });
        
    };
    $scope.showDataId();
    
    $scope.back = function (){
        $state.go('tab.mahasiswa');
    };
    
    $ionicModal.fromTemplateUrl('edit.html', function(modal){
        $scope.taskModal = modal;
	}, {
            scope : $scope,
            animation : 'slide-in-up'	
	});
        
        $scope.showAlert = function(msg) {
            $ionicPopup.alert({
                title: msg.title,
                template: msg.message,
                okText: 'Ok',
                okType: 'button-positive'
            });
          };
	
	$scope.editModal = function(){
            $scope.taskModal.show();
	};
	
	$scope.batal = function(){
            $scope.taskModal.hide();
            $scope.showDataId();
	};
        
	$scope.edit = function(nama_mhs,alamat_mhs,id_jurusan){
            if (!nama_mhs){
                $scope.showAlert({
                    title: "Information",
                    message: "Nama Mohon Diisi"
                });
            }else if(!alamat_mhs){
                $scope.showAlert({
                    title: "Information",
                    message: "Alamat Mohon Diisi"
                });
            }else if(!id_jurusan){
                $scope.showAlert({
                    title: "Information",
                    message: "Jurusan Mohon Diisi"
                });
                }else{
                $scope.nama_mhs = nama_mhs;
                $scope.alamat_mhs = alamat_mhs;
                $scope.id_jurusan = id_jurusan;
                mahasiswaService.update({
                    'nama_mhs': nama_mhs,
                    'alamat_mhs': alamat_mhs,
                    'id_jurusan': id_jurusan
                }).then(function(resp) {
                  console.log('Success', resp);
                  $scope.showAlert({
                        title: "Information",
                        message: "Data Telah Diupdate"
                    });
                },function(err) {
                  console.error('Error', err);
                }); 
            }
	};
	
})
      
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
