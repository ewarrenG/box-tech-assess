var box = new BoxSdk();
var accessToken = "UnbOsuLrVLVpDv6NWdfe77xCjIrXRyQS";
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


