$(function(){

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude + "-" + position.coords.longitude);
          
          let url = "https://api.flickr.com/services/rest/?"
          let params = {
              api_key : "<API KEY HERE>",
              lat : position.coords.latitude.toFixed(1),
              lon : position.coords.longitude.toFixed(1),
              method:"flickr.photos.search",
              extras: "url_n", 
              format:"json",
              tags : "places",
              nojsoncallback : 1,

          }

          for(let key in params){
            url += "&"+ key + "=" + params[key]
          }

          $.get(url, function(res){
            console.log(res.photos.photo)
            if(res.photos.photo.length > 1){
                res.photos.photo.forEach(element => {
                    $(".info").append(`<img src="${element.url_n}"/>`)
                });
            }else{
                $(".info").append("Nothing Found!")
            }
        })
    })
    }else{
        $(".info").append("Could find anything without your location!")
    }
    

})