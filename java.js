//create userid
function makeId(strLength) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < strLength; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};
var userId = makeId(32);
window.location.hash = userId;

$('body').append('<span class="abs-top-right">' + userId + '</span>');



//included for the purposes of reading information from Box
//part of initial dev work
var box = new BoxSdk();
var accessToken = "Ym67uwveS5EhhUrho1GstzlkunIo4B4x"; //expired
var boxClient = new box.BasicBoxClient({ accessToken: accessToken });

var folderId = '46199583831'; //loan applications
boxClient.folders.get({ id: folderId, params: {fields: "name,item_collection"} })
  .then(function (folder) {
    var rootFolder = folder;
    var id = folder.id;
    console.log(rootFolder);
  })
  .catch(function (err) {
    console.log(err);
  });


//uploader
var uploaderOptions = {
container: '.container',
size: 'small', 
onClose: function(){
  location.reload();
}
}
var uploader = new Box.ContentUploader();
uploader.on('complete', function(data){
  //console.log('complete');
  //console.log(data);
  enablePreview(data[0].id);
  attachMeta(data[0].id);
  $(".preview-container").outerHeight(525);
});
uploader.show(folderId, accessToken, uploaderOptions);


//preview
var previewOptions = {
  container: '.preview-container',
  showDownload: true,
  logoUrl: 'assets/preview.png'
}
var preview = new Box.Preview();
function enablePreview(fileId){
	preview.show(fileId, accessToken, previewOptions);
	$('ul.nav-tabs li:last').removeClass("hide");
	//$('li a[href="#preview"]').attr("data-toggle", "tab");
	//$.('.nav-tabs a[href="#preview"]').tab('show');
}

//meta
function attachMeta(fileId){
  console.log("attachMeta");
  var scope = "global";
  boxClient.metadata.createFileMetadata({
  	fileId: fileId,
	scope: scope,
	body: {
	  userId: userId
	},
	templateKey: "properties"
  });
  console.log("attachMeta 2x");
}




