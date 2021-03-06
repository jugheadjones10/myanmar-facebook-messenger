var {callSendAPI} = require("./callSendAPI")
var {mongoose} = require("./../database/mongoose")
var {careSetting, careDaily, careWeekly, careGiverWeekSubDoc} = require("./../mongoose-schemas/one")
var {get_started__send_morning_time} = require("./../event-response-pairs/get_started__send-morning_time")
var {send_morning_time__send_night_time} = require("./../event-response-pairs/send_morning-time__send_night_time")
var {send_night_time__send_year_goal} = require("./../event-response-pairs/send_night_time__send_year_goal")
var {send_year_goal__send_week_goal} = require("./../event-response-pairs/send_year_goal__send_week_goal")
var {send_week_goal__send_concluding_message} = require("./../event-response-pairs/send_week_goal__send_concluding_message")
var {daily_goal__congratz_statement} = require("./../event-response-pairs/daily_goal__congratz_statement")
var {complete_day_goals__congratz_statement} = require("./../event-response-pairs/complete_day_goals__congratz_statement")
var {week_reflection__send_week_goal} = require("./../event-response-pairs/week_reflection__send_week_goal")
var {send_week_goal__restart} = require("./../event-response-pairs/send_week_goal__restart")
var {fb_tester_set_2019_time} = require("./../event-response-pairs/fb_tester_set_2019_time")
 
function handleMessage(sender_psid, received_message) {

    // Check if the message contains text
    if (received_message.text) {
       
        // callSendAPI(sender_psid, get_started__send_morning_time(received_message, sender_psid)  
        // ||  send_morning_time__send_night_time(received_message, sender_psid) ||  send_night_time__send_year_goal(received_message, sender_psid) 
        // ||  send_year_goal__send_week_goal(received_message, sender_psid)
        // )
      
        var hey = [
            get_started__send_morning_time(received_message, sender_psid),
            send_morning_time__send_night_time(received_message, sender_psid),
            send_night_time__send_year_goal(received_message, sender_psid),
            send_year_goal__send_week_goal(received_message, sender_psid),
            send_week_goal__send_concluding_message(received_message, sender_psid),
            daily_goal__congratz_statement(received_message, sender_psid),
            complete_day_goals__congratz_statement(received_message, sender_psid),
            week_reflection__send_week_goal(received_message, sender_psid),
            send_week_goal__restart(received_message, sender_psid),
            fb_tester_set_2019_time(received_message, sender_psid)
        ]

        hey.forEach(function(res){
            if(res !== undefined){
                callSendAPI(sender_psid, res)
            }
        })
        
    
    }else if(received_message.attachments){
        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url
        // response = {
        //     "attachment": {
        //         "type": "template",
        //         "payload": {
        //             "template_type": "generic",
        //             "elements": [{
        //                 "title": "Do you like this pic?",
        //                 "subtitle": "Tap a button to answer.",
        //                 "image_url": attachment_url,
        //                 "buttons": [
        //                     {
        //                         "type": "postback",
        //                         "title": "Yes!",
        //                         "payload": "yes",
        //                     },
        //                     {
        //                         "type": "postback",
        //                         "title": "No!",
        //                         "payload": "no",
        //                     }
        //                 ]
        //             }]
        //         }
        //     }
        // }
    }

    
        
}

module.exports = {handleMessage}