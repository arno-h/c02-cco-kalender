const BlobStorage = require('./BlobStorage');

class Logger {
    constructor(containerName, blobName) {
        this.blobName = blobName;
        this.blobService = new BlobStorage(containerName);
        this.inFlight = [];
    }

    log(message) {
        let entry = (new Date()).toISOString() + ": " + message + "\n";
        this.inFlight.push(entry);
        if (this.inFlight.length === 1) {
            this._sendMessage(entry);
        }
    }

    _sendMessage(entry) {
        this.blobService.appendTextToBlob(this.blobName, entry)
            .then(() => {
                this.inFlight.shift();
                if (this.inFlight.length > 0) {
                    this._sendMessage(this.inFlight[0]);
                }
            })
            .catch(e => console.log('ERROR while logging message: ' + entry));
    }
}

module.exports = Logger;
