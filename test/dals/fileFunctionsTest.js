const chai = require('chai');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const stream = require('stream');

chai.use(require('chai-http'));

const Issue = require('../../models/issueModel');
const path = require('path');
const File = require(path.resolve('./models/fileModel'));

const testFile = require('../../dals/fileFunctions');

describe('API files', function(){
    this.timeout(5000);

    //dropDatabase

    describe('Upload file function', function(){
       
        describe('Valid params', function(){

            let issueId, file;
            before((done) => {
                const issue = {
                    id: "5ab25c27f608fb1f201413e5"
                };
                issueId = issue.id;

                // how to insert real file in test or how to test without one?
                file = {
                    path: 'fakeFile.txt',
                    filename: 'fakeFile' 
                }
                done();
            });

            it('should upload file', function(done){
                
                testFile.uploadFile(file, issueId)
                .then((file) => {

                    expect(file).to.be.an('object');
                    expect(file.path).to.not.equal(undefined);
                    expect(file.issue).to.not.equal(undefined);
                    

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let issueId, file;
            before((done) => {
                const issue = {
                    id: "5ab25c27f608fb1f201413e5"
                };
                issueId = issue.id;
                file = "file.doc";

                done();
            });
            it('should not upload', function(done){

                testFile.uploadFile(file, issueId)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err.name).to.equal('TypeError');            
                    done();
                })
                .catch(done);
            });
        });
    });
    describe('Download file function', function(){
       
        describe('Valid params', function(){

            let fileId;
            before((done) => {
                fileId = "5ab4d2e254eef13bd0c4a954";
               
                done();
            });

            it('should download file', function(done){
                
                testFile.downloadFile(fileId)
                .then((fileExport) => {

                    expect(fileExport).to.be.an('object');
                    // check if file iz ReadStream /stream.Readable?
                    expect(fileExport).to.be.equal(stream.Readable);                    

                    done();
                }, done)
                .catch(done);
            });
        });
        describe('Invaild params', function() {

            let fileId;
            before((done) => {
                fileId = "1";
               
                done();
            });
            it('should not save to hard disk', function(done){

                testFile.downloadFile(fileId)
                .then(done, (err) => {
                    expect(err).to.not.be.null;
                    expect(err.name).to.equal('CastError');            
                    done();
                })
                .catch(done);
            });
        });
    });
});