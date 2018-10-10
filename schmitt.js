/**
 * Copyright 2018 Michael Jacobsen.
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
    
    function SchmittNode(config) {
        RED.nodes.createNode(this, config)

        // service node properties
        this.thresholdlow   = config.thresholdlow
        this.thresholdhigh  = config.thresholdhigh
        this.topiclow       = config.topiclow
        this.topichigh      = config.topichigh
        this.name           = config.name
        this.lastAction     = -1

        var node = this

        // respond to inputs
        this.on('input', function (msg) {
            var val = util.ValueToNumber(msg.payload)

            //console.log("SchmittNode(): val =", val)
            if (val == null) {
                return
            }

            if (val >= node.thresholdhigh) {
                //console.log("SchmittNode(): high")
                if (node.lastAction != 1) {
                    var m = {}
                    m.topic         = node.topichigh
                    m.payload       = true
                    node.lastAction = 1

                    //console.log("SchmittNode(): high - send")
                    node.send(m)
                }

                return
            }

            if (val <= node.thresholdlow) {
                //console.log("SchmittNode(): low")
                if (node.lastAction != 0) {
                    var m = {}
                    m.topic         = node.topiclow
                    m.payload       = false
                    node.lastAction = 0

                    //console.log("SchmittNode(): low - send")
                    node.send(m)
                }

                return
            }
        })

        this.on('close', function () {
        })
    }
    
    RED.nodes.registerType('logic-schmitt', SchmittNode)
}
