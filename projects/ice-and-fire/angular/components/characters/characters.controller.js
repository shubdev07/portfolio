//this is the controller for the characters
app.controller("characterController", ["$scope", "$routeParams", "$timeout", "storedData",
    function($scope, $routeParams, $timeout, storedData) {
        $scope.count = $routeParams.no; //contains the character no
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
            //this function loops through each character and extracts the url no from all urls
            var houseNo = 0;
            var booksNo = 0;
            var povBooksNo = 0;
            var index = 0;
            angular.forEach(main.characters, function(character) {
                storedData.data.characters[index].index = index; //setting index for each character
                index++;
            });
            angular.forEach(main.characters, function(character) {
                //looping through each character
                storedData.data.characters[houseNo].housesIndex = []; //making a new key in each character object
                angular.forEach(character.allegiances, function(url) {
                    //getting the url of all the houses each character has
                    storedData.data.characters[houseNo].housesIndex.push(parseInt(url.replace(/[^\d]/g, ""))); //extracting the number from the url and pushing it to the housesIndex array inside each character object
                });
                houseNo++;
            });
            angular.forEach(main.characters, function(character) {
                //looping through each character
                storedData.data.characters[booksNo].booksIndex = []; //making a new key in each character object
                angular.forEach(character.books, function(url) {
                    //getting the url of all the houses each book has
                    storedData.data.characters[booksNo].booksIndex.push(parseInt(url.replace(/[^\d]/g, ""))); //extracting the number from the url and pushing it to the booksIndex array inside each character object
                });
                booksNo++;
            });
            angular.forEach(main.characters, function(character) {
                //looping through each character
                storedData.data.characters[povBooksNo].povBooksIndex = []; //making a new key in each character object
                angular.forEach(character.povBooks, function(url) {
                    //getting the url of all the houses each book has
                    storedData.data.characters[povBooksNo].povBooksIndex.push(parseInt(url.replace(/[^\d]/g, ""))); //extracting the number from the url and pushing it to the povBooksIndex array inside each character object
                });
                povBooksNo++;
            });
        }, 1000);
    }
]);