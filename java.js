//included for the purposes of reading information from Box
//part of initial dev work
var box = new BoxSdk();
var accessToken = "FwHHAfeRnky1PlfzffURG5rugoB9sBza"; //expired
var boxClient = new box.BasicBoxClient({ accessToken: accessToken });
boxClient.folders.get({ id: "46199583831", params: {fields: "name,item_collection"} })
  .then(function (folder) {
    var rootFolder = folder;
    var id = folder.id;
    console.log(rootFolder);
  })
  .catch(function (err) {
    console.log(err);
  });


