//setting up the initial configuration of the application
var app = angular.module("myApp", ["ngRoute", "angularUtils.directives.dirPagination"]);
//the below function will run immediately when application loads for the first time.The purpose is to load data from the url's and then will store them in a service so as the external http request are made only once
app.run(["loadAllData", "storedData",
    function (loadAllData, storedData) {
        //loadAllData is a factory which will return the data received from the api of an api of ice and fire
        //storedData is a service which will store the data so that the other controllers can access them without making http request
        storedData.data = loadAllData.loadData();
    }
]);
