//this service will store all the data that is being loaded by the loadAllData factory
//so that the controllers of this application can access this data without calling the loadAllData factory
//thus the http requests are made only once
app.service("storedData", function () {
    //will store data in the runtime
});
