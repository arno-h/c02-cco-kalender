const storage = require('azure-storage');
const promisify = require('./utils').promisify;


class BlobStorage {
    // assumes that ENV variables are loaded
    constructor(containerName) {
        this.containerName = containerName;
        this.blobService = storage.createBlobService();
    }

    createContainer() {
        return promisify(callback => {
            this.blobService.createContainerIfNotExists(this.containerName, {publicAccessLevel: 'blob'}, callback);
        });
    }

    list() {
        return promisify(callback => {
            this.blobService.listBlobsSegmented(this.containerName, null, callback);
        });
    }

    uploadFile(destBlobName, sourceFilePath) {
        return promisify(callback => {
            this.blobService.createBlockBlobFromLocalFile(this.containerName, destBlobName, sourceFilePath, callback);
        });
    }

    uploadString(destBlobName, sourceString) {
        return promisify(callback => {
            this.blobService.createBlockBlobFromText(this.containerName, destBlobName, sourceString, callback);
        });
    }

    downloadFile(sourceBlobName, destFilePath) {
        return promisify(callback => {
            this.blobService.getBlobToLocalFile(this.containerName, sourceBlobName, destFilePath, callback);
        });
    }

    downloadString(sourceBlobName) {
        return promisify(callback => {
            this.blobService.getBlobToText(this.containerName, sourceBlobName, callback);
        });
    }

    remove(blobName) {
        return promisify(callback => {
            this.blobService.deleteBlobIfExists(this.containerName, blobName, callback);
        });
    }

    createAppendBlob(blobName) {
        return promisify(callback => {
            this.blobService.createOrReplaceAppendBlob(this.containerName, blobName, callback);
        })
    }

    appendTextToBlob(blobName, textString) {
        return promisify(callback => {
            this.blobService.appendFromText(this.containerName, blobName, textString, callback);
        })
    }
}

module.exports = BlobStorage;
