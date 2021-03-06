var express     =   require("express");
var router      =   express.Router();
var async       =   require("async");
var User        =   require("../models/user");
var Blog        =   require("../models/blog");
var middleware  =   require("../middleware");


// ===============================
// BLOG CATEGORY CONTROLLER
// ===============================

var output = {
    headlines: []
};


// ===============================
// BLOG ROUTES
// ===============================

router.get("/headlines", function(req, res){    
    output = {    
    headlines: []
};
    async.parallel([
        function(cb) {
            Blog.find({"category": "headlines"}).exec(function(err, headlinesBlogs){
                if (err){
                    console.log(err);                
            } else {
                output.headlines = headlinesBlogs;
                cb(null, headlinesBlogs);
            }
            });
        },
    ], function(err, results){
        res.render("blogs/headlines", {       
            headlinesBlogs: output.headlines
        });
    });
});
   

module.exports = router;