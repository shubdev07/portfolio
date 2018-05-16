//setting up the routes for app

app.config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl: "/angular/views/home.htm"
            })
            //book routing
            .when("/books", {
                templateUrl: "angular/components/books/books.html",
                controller: "bookController",
                controllerAs: "bookController"
            })
            .when("/bookDetails/:no", {
                templateUrl: "angular/components/books/book_single_details_view.html",
                controller: "bookController",
                controllerAs: "bookController"
            })
            //houses routing
            .when("/houses", {
                templateUrl: "angular/components/houses/houses.html",
                controller: "houseController",
                controllerAs: "houseController"
            })
            .when("/houseDetails/:no", {
                templateUrl: "angular/components/houses/house_single_details_view.html",
                controller: "houseController",
                controllerAs: "houseController"
            })
            //characters routing
            .when("/characters", {
                templateUrl: "angular/components/characters/characters.html",
                controller: "characterController",
                controllerAs: "characterController"
            })
            .when("/characterDetails/:no", {
                templateUrl: "angular/components/characters/character_single_details_view.html",
                controller: "characterController",
                controllerAs: "characterController"
            })
            .otherwise({
                template: "<h2>404 page not found <a href='#/'>Go To Home</a></h2>"
            });
    }
]);
