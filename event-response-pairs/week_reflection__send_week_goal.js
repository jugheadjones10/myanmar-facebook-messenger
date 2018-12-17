const {mongoose} = require("./../database/mongoose")
var {careSetting, careDaily, careWeekly} = require("./../mongoose-schemas/one")
var moment = require('moment')


function week_reflection__send_week_goal(received_message, sender_psid){

    if(received_message.text.split(" ").includes("could")){
        //Improve criteria to run this callback
        var week_of_year = 5
        careWeekly.findOne({sender_PSID: sender_psid}).then((doc) => {
            doc.myWeekDetails.forEach(function(ele){
                if(ele.week_number === (week_of_year - 1)){
                    ele.myWeekDetails.week_goal_conclusion = received_message.text
                }
            })
        })

        var response
        return response = {
            "text" : `What is your next goal for week ${week_of_year}?`
        }
    
        

    }else{
        return undefined
    }
}

module.exports = {week_reflection__send_week_goal}
