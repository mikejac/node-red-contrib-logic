/**
 * Copyright 2016 Michael Jacobsen.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function (RED) {
    'use strict'

    var util = require('./lib/common_functions.js')
    
    function OnOffSwitchNode(config) {
        RED.nodes.createNode(this, config)

        // service node properties
        this.enabletopic    = config.enabletopic
        this.state          = config.state
        this.name           = config.name
        this.lastMsg        = null

        var node = this

        if (node.state) {
            node.status({fill:"gray", shape:"dot", text:"on"})
        } else {
            node.status({fill:"gray", shape:"dot", text:"off"})
        }

        // respond to inputs
        this.on('input', function (msg) {
            if (msg.topic == node.enabletopic) {
                var val = util.ValueToBool(msg.payload)

                //console.log("OnOffSwitchNode(): val =", val)
                if (val == null) {
                    return
                }

                if (val == true && node.lastMsg != null) {
                    //console.log("OnOffSwitchNode(): send last message received")

                    // send last message received
                    node.send(node.lastMsg)
                }

                node.state = val

                if (node.state) {
                    node.status({fill:"gray", shape:"dot", text:"on"})
                } else {
                    node.status({fill:"gray", shape:"dot", text:"off"})
                }
            } else if (node.state) {
                //console.log("OnOffSwitchNode(): sending message")

                node.lastMsg = msg
                node.send(msg)
            } else {
                node.lastMsg = msg
            }
        })

        this.on('close', function () {
        })
    }
    
    RED.nodes.registerType('logic-onoffswitch', OnOffSwitchNode)
}
