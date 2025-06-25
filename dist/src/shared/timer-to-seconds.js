"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return timerToSeconds;
    }
});
function timerToSeconds({ days = 0, hours = 0, minutes = 0, seconds = 0 }) {
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
}
