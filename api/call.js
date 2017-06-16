var data = require('./sample')
,moment = require('moment')
,_ = require('lodash')


exports.getDetails = function(req, res) {
    // console.log('----', sampleData)
    consultationId = req.query.consultationId
    _.forEach(data, function(v){
        // console.log(v.callLegs)
        v.hascallLegs = v.callLegs.length > 0
    })
    var returnData = {
        id: data[0].consultationId
        ,title: data[0].title
        ,participants: data
    }

    // console.log('--details--', sampleData)
    res.render('index.html', returnData)
}