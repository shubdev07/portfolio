//this is the controller for the books
app.controller("bookController", ["$scope", "$routeParams", "$timeout", "storedData",
    function($scope, $routeParams, $timeout, storedData) {
        $scope.count = $routeParams.no; //contains the book no
        $scope.filter = "name"; //for sorting and filtering by default its 'name'
        $scope.reverse = false; //for togling ascending and descending
        var main = this;
        //loading all the books characters and houses from the storedData service
        main.books = storedData.data.books;
        main.houses = storedData.data.houses;
        main.characters = storedData.data.characters;
        $timeout(function() {
            //this function loops through each book and extracts the characters no each book has and stores it in a new key  inside each book object called charactersIndex
            var bookNo = 0;
            var povCharacterNo = 0;
            var index = 0;
            angular.forEach(main.books, function(book) {
                storedData.data.books[index].index = index; //setting index for each book
                index++;
            });
            angular.forEach(main.books, function(book) {
                //looping through each book
                storedData.data.books[bookNo].charactersIndex = []; //making a new key in each books object
                angular.forEach(book.characters, function(url) {
                    //getting the url of all the characters each book has
                    storedData.data.books[bookNo].charactersIndex.push(parseInt(url.replace(/[^\d]/g, ""))); //extracting the number from the url and pushing it to the charactersIndex array inside each book object
                });
                bookNo++;
            });
            angular.forEach(main.books, function(book) {
                //looping through each book
                storedData.data.books[povCharacterNo].povCharactersIndex = []; //making a new key in each books object
                angular.forEach(book.povCharacters, function(url) {
                    //getting the url of all the povcharacters each book has
                    storedData.data.books[povCharacterNo].povCharactersIndex.push(parseInt(url.replace(/[^\d]/g, ""))); //extracting the number from the url and pushing it to the povcharactersIndex array inside each book object
                });
                povCharacterNo++;
            });
        }, 1000); //waits for a second before running because of the asynchroous https request made by the loadAllData factory
    }
]);