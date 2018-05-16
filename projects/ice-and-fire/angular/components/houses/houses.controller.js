app.controller("houseController", ["$scope", "$routeParams", "$timeout", "storedData",
    function($scope, $routeParams, $timeout, storedData) {
        $scope.count = $routeParams.no;
        $scope.currentPage = 1; //for pagination
        $scope.pageSize = 10; //for pagination as well
        $scope.filter = "name"; //for sorting and filtering by default its 'name'
        $scope.reverse = false; //for togling ascending and descending
        var main = this;
        //loading all the books characters and houses from the storedData service
        main.books = storedData.data.books;
        main.houses = storedData.data.houses;
        main.characters = storedData.data.characters;
        $timeout(function() {
            //this function loops through each house and extracts the url no from all urls
            var currentLord = 0;
            var heir = 0;
            var overlord = 0;
            var founder = 0;
            var branches = 0;
            var members = 0;
            var index = 0;
            angular.forEach(main.houses, function() {
                storedData.data.houses[index].index = index; //setting index no for each house
                index++;
            });
            angular.forEach(main.houses, function(house) {
                //looping through each house
                storedData.data.houses[branches].branchesIndex = []; //making a new key in each house object
                angular.forEach(house.cadetBranches, function(url) {
                    //getting the url of all the branches each house has
                    storedData.data.houses[branches].branchesIndex.push(parseInt(url.replace(/[^\d]/g, ""))); //extracting the number from the url and pushing it to the branchesIndex array inside each house object
                });
                branches++;
            });
            //doing the same thing to extract numbers from (url of swornMenbers) of each house
            angular.forEach(main.houses, function(house) {
                storedData.data.houses[members].membersIndex = [];
                angular.forEach(house.swornMembers, function(url) {
                    storedData.data.houses[members].membersIndex.push(parseInt(url.replace(/[^\d]/g, "")));
                });
                members++;
            });
            //doing the same thing to extract numbers from (url of overlord) of each house
            angular.forEach(main.houses, function(house) {
                storedData.data.houses[overlord].overlord = parseInt(house.overlord.replace(/[^\d]/g, "") - 1);
                overlord++;
            });
            //doing the same thing to extract numbers from (url of currentLord) of each house
            angular.forEach(main.houses, function(house) {
                storedData.data.houses[currentLord].currentLord = parseInt(house.currentLord.replace(/[^\d]/g, "") - 1);
                currentLord++;
            });
            //doing the same thing to extract numbers from (url of heir) of each house
            angular.forEach(main.houses, function(house) {
                storedData.data.houses[heir].heir = parseInt(house.heir.replace(/[^\d]/g, "") - 1);
                heir++;
            });
            //doing the same thing to extract numbers from (url of founder) of each house
            angular.forEach(main.houses, function(house) {
                storedData.data.houses[founder].founder = parseInt(house.founder.replace(/[^\d]/g, "") - 1);
                founder++;
            });
        }, 1000);
    }
]);