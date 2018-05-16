//this factory return a method called getData which when invoked will fetch all the books characters and houses data from external apis and will return the result in an organized manner 

app.factory("loadAllData", ["$http", "$q",
    function ($http, $q) {
        var getData = function () {
            var category = ["books", "characters", "houses"];
            var no = [1, 43, 9]; //each category page no taking page size as 50
            var bookPromises = []; //will store the promise sent after making http request to the book api
            var characterPromises = []; //will store the promise sent after making http request to the character api
            var housePromises = []; //will store the promise sent after making http request to the houses api
            var books = []; //will contain all the books after resolving the promise
            var characters = []; //will contain all the characters after resolving the promise
            var houses = []; //will contain all the houses after resolving the promise
            for (var i = 0; i < category.length; i++) {
                //run the loop for each category
                for (var j = 0; j < no[i]; j++) {
                    //for each category run the loop as many times as its page no taking page size as 50
                    if (i === 0) {

                        bookPromises.push($http.get(`https://anapioficeandfire.com/api/${category[i]}?page=${j + 1}&pageSize=50`)); //push each promise into the bookPromises array
                    }
                    if (i === 1) {

                        characterPromises.push($http.get(`https://anapioficeandfire.com/api/${category[i]}?page=${j + 1}&pageSize=50`)); //push each promise into the characterPromises array
                    }
                    if (i === 2) {

                        housePromises.push($http.get(`https://anapioficeandfire.com/api/${category[i]}?page=${j + 1}&pageSize=50`)); //push each promise into the housePromises array
                    }

                } //end of inside for loop 
            } //end of the outer for loop


            //resolve all the book promise and push all the books inside the books array
            $q.all(bookPromises).then(function (data) {
                    angular.forEach(data, function (doc) {
                        angular.forEach(doc.data, function (book) {
                            books.push(book);
                        }); //end of doc.data array looping
                    }); //end of data array looping
                })
                .catch(function (err) {
                    alert("some error occured");
                    console.log(err);
                }); //end of bookPromises array looping

            //resolve all the character promise and push all the characters inside the characters array
            $q.all(characterPromises).then(function (data) {
                    angular.forEach(data, function (doc) {
                        angular.forEach(doc.data, function (character) {
                            characters.push(character);
                        }); //end of doc.data array looping
                    }); //end of data array looping
                })
                .catch(function (err) {
                    alert("some error occured");
                    console.log(err);
                }); //end of characterPromises array looping

            //resolve all the house promise and push all the houses inside the houses array
            $q.all(housePromises).then(function (data) {
                    angular.forEach(data, function (doc) {
                        angular.forEach(doc.data, function (house) {
                            houses.push(house);
                        }); //end of doc.data array looping
                    }); //end of data array looping
                })
                .catch(function (err) {
                    alert("some error occured");
                    console.log(err);
                }); //end of housePromises array looping

            return {
                books: books,
                characters: characters,
                houses: houses
            }; // getData function returns an object containing books characters and houses
        };
        return {
            loadData: function () {
                var data = getData();
                return data;
            } //loadAllData factory returns a method which when invoked will fetch all the data from the external api and will return an object in an organized manner
        };
    }
]);
