import React, { Component } from 'react';
import Files from "react-files";
import fileSaver from 'file-saver';
//import fs from 'file-system';
//import ftp from 'ftp';

class SingleForm extends Component
{
  constructor()
  {
    super();

    this.state =
    {
      username: {},
      password: {},
      ip: {},
      port: {},
      jobname: {},
      param: []
    }
  }
  
  setJsonInState()
  {
    this.state =
    {
      username: 'DorikTheGreat',
      password: 'DorikTheGreat',
      ip: '10.0.0.52',
      port: '8082',
      jobname: 'HelloReact',
      param:
      [
        {
          test: 'Connection Test',
          firstname: 'Mhy',
          lastname: 'Faddik',
          files: 'File1.Test2.Work3.Ralts5'
        }
      ]
    }
  }
  
  formSubmitHandler(e)
  {
    this.setJsonInState();

    let data = this.state;

    console.log(JSON.stringify(data));

    /*
    fetch('http://10.215.48.28:1560/test', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    }).then(function(response){
      alert(response.blob())
    }).catch(function(err){
      alert(err)
    })
    */
    
    fetch('http://10.215.48.28:1560/test', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    }).then(response => { 
      return response.text(); 
    }).then(data => { 
      alert(JSON.stringify(data));
    }).catch(err => {
        alert(err);
    });
    
    // Verify JCL

    // Verify Shell

    // Check Radio Button Option

    // Parse Needed Information

    // Call Dorik Function

    e.preventDefault();
  }

  onRadioButtonChange(inputValue)
  {
    if(inputValue === "Input")
    {
      this.refs.inputOption.checked=true;
      this.refs.outputOption.checked=false;
      this.refs.bothOption.checked=false;
    }
    else if(inputValue === "Output")
    {
      this.refs.inputOption.checked=false;
      this.refs.outputOption.checked=true;
      this.refs.bothOption.checked=false;
    }
    else if(inputValue === "Both")
    {
      this.refs.inputOption.checked=false;
      this.refs.outputOption.checked=false;
      this.refs.bothOption.checked=true;
    }
    else
    {
      alert('Unknown Error');
    }
  }

  onFileChange(files)
  {

    //var fileR = new FileReader();
    //console.log(files[0].webkitRelativePath + '/' + files[0].name);
    //console.log(files[0].fullPath + '/' + files[0].name);
    console.log(files);
    //console.log(filer.readAsText(files));
    //console.log(files[0].get_webkitRelativePath());
    //console.log(files);

    //fileSaver.saveAs(files[0], 'file:///C:/Users/ghordyne.p.gildore/Desktop/IDidIt.txt', false);

    var client = require('ftp');
    
    let fileTransfer = new client();
    
    fileTransfer.on('ready', function() {
      fileTransfer.list(function(err, list) {
        if(err) console.log(err);
        console.dir(list);
        fileTransfer.end();
      })
    });

    fileTransfer.connect('10.0.0.52', 22, 'ATCP01');

  }

  onFileError(error, file)
  {
    console.log('error code ' + error.code + ':' + error.message);
  }

  render()
  {
    return (
      //<form action='http://10.215.48.28:1560/' method='GET'>
      <form onSubmit={this.formSubmitHandler.bind(this)}>
        <h2>SINGLE FILE</h2>
        <div className="file-selection">
          <div className="Files">
            <Files className='files-dropzone'
                   onChange={this.onFileChange}
                   onError={this.onFileError}
                   accepts={['.csv']}
                   multiple
                   maxFileSize={100000000}
                   minFileSize={0}
                   clickable
            >
              <p>Drop JCL file here or click to Upload</p>
            </Files>
          </div>
          <br />
          <div className="Files">
            <Files className='files-dropzone'
                   onChange={this.onFileChange}
                   onError={this.onFileError}
                   accepts={['.csv']}
                   multiple
                   maxFileSize={100000000}
                   minFileSize={0}
                   clickable
            >
              <p>Drop Shell file here or click to Upload</p>
            </Files>
          </div>
        </div>
        <br />
        <div className="radio-selection">
          <input type="radio" value="Input" ref="inputOption" onChange={this.onRadioButtonChange.bind(this, "Input")} />
          <label>Input</label>
          <input type="radio" value="Output" ref="outputOption" onChange={this.onRadioButtonChange.bind(this, "Output")} />
          <label>Output</label>
          <input type="radio" value="Both" ref="bothOption" checked={true} onChange={this.onRadioButtonChange.bind(this, "Both")} />
          <label>Both</label>
        </div>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default SingleForm;
