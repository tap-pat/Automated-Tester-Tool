import React, { Component } from 'react';

class FileInput extends Component
{
    constructor(props)
    {
      super(props)
      this.uploadFile = this.uploadFile.bind(this);
    }
    
    uploadFile(event)
    {
        let file = event.target.files[0];
        console.log(file);
        console.log(file.webkitRelativePath.name);
        
        if (file) 
        {
          let data = new FormData();
          data.append('file', file);
          // axios.post('/files', data)...
        }
    }
    
    render()
    {
      return <span>
        <input type="file"
        name="myFile"
        onChange={this.uploadFile} />
      </span>
    }
}

export default FileInput;
