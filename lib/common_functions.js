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

'use strict'

/******************************************************************************************************************
 *
 *
 */
module.exports.ValueToNumber = function(value) {
    if (typeof value === 'string') {
        var val = parseInt(value)

        if (isNaN(val)) {
            return null
        }

        return val
    } else if (typeof value === 'number') {
        return value
    } else if (typeof value === 'boolean') {
        if (value) {
            return 1
        } else {
            return 0
        }
    }

    return null
}
/******************************************************************************************************************
 *
 *
 */
module.exports.ValueToBool = function(value) {
    if (typeof value === 'string') {
        var t = value.toUpperCase()

        if (t == "TRUE" || t == "ON" || t == "YES" || t == "1") {
            return true
        } else if (t == "FALSE" || t == "OFF" || t == "NO" || t == "0") {
            return false
        } else {
            return null
        }
    } else if (typeof value === 'number') {
        return value
    } else if (typeof value === 'boolean') {
        var val = (value > 0)
        return val
    }

    return null
}
