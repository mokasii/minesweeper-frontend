require('jest-fetch-mock').enableMocks()

window.HTMLMediaElement.prototype.play = async () => { /* do nothing */ };
window.HTMLMediaElement.prototype.load = () => { /* do nothing */ };