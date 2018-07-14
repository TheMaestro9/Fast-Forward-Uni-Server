
db = require("../db")

function addParts(videos,index ,callback) {
    video = videos[index]
    var videoId = video.video_id;
    var lq = video.low_quality_url;
    var hq = video.high_quality_url;
  
    var qstring = "select * from vr_video_parts  where vr_video_id =" + videoId + " order by part_index ";
    console.log(qstring);
    db.query(qstring, function (err, result) {
      if (err) {
        console.log(err);
        //  response.status(500).send(err);
      } else {
        var FullVideo = {
          "vr_video_id": videoId,
          "high_quality_url": hq,
          "low_quality_url": lq,
          "part_name": "Full Video"
        }
        result.push(FullVideo);
        videos[index]['parts'] = result 
        callback(videos);
      }
  
    });
  
  }
  

exports.getVrVideos = (req, res, next) => { 
    qstring = "select * from vr_video"
    db.query(qstring , function(err,result){ 
        if(err)
            res.send( { 
                error: err, 
                success: false 
            })
        else {
            counter =0 
            for (var i =0 ; i < result.length ; i++){ 
                addParts(result, i, function (videosWithParts){ 
                    result = videosWithParts
                    counter +=1  
                    if(counter===result.length)
                    res.send({ 
                        success: true, 
                        data:videosWithParts 
                    })
                })

        }
    }
    })
}