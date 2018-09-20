import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Files from "react-files";
import BatchTable from './BatchTable';
import "react-table/react-table.css";
import './BatchForm.css';

class BatchForm extends Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
	  batchJson:{},
      batchRow:[],
	  jsonsamp:{"jclDirectory":"/home/ATCP01/dev/repository/baseline/","jcl":"TEST0001.jcl","shellDirectory":"/home/ATCP01/dev/repository/target","shell":"TEST0001.sh"}
    }
  }

  onFileChange(files)
  {
    
    const columns = [
      {
        Header: "Baseline Directory",
        accessor: "jclDirectory",
      },
      {
        Header: "Baseline",
        accessor: "jcl",
      },
      {
        Header: "Target Directory",
        accessor: "shellDirectory",
      },
      {
        Header: "Target",
        accessor: "shell",
      },
      {
        Header: "Status",
        accessor: "Loaded",
      }
    ];

    var index = files.length - 1;
	var formData = new FormData();
	formData.append('csvFile', files[index]);
	
    fetch('http://10.215.147.55:3000/loadJobs', {
      method: 'POST',
      body: formData
    }).then(response => { 
      return response.text(); 
    }).then(data => { 
	  this.setState({batchRow : JSON.parse(data)});
	  this.setState({batchJson : data});
      ReactDOM.render(<BatchTable data={this.state.batchRow}
	                              columns={columns}
								  filename={files[index].name}
								  rowNum={this.state.batchRow.length} />, document.getElementById('batch-table'));
    }).catch(err => {
        alert(err);
    });

  }
  

  submitHandler = event => {

	event.preventDefault();
    fetch('http://10.215.147.55:3000/runJob', {
      method: 'POST',
      body: this.state.batchJson,
      headers: {'Content-Type': 'application/json'}
    }).then(response => { 
	  var reply = response.text();

	  console.log(reply); 
    }).catch(err => {
        alert(err);
    });
  };
  
  onFileError(error, file)
  {
    console.log('error code ' + error.code + ':' + error.message);
  }

  render()
  {

    const columns = [
      {
        Header: "JCL Directory",
        accessor: "jclDirectory",
      },
      {
        Header: "JCL",
        accessor: "jcl",
      },
      {
        Header: "Shell Directory",
        accessor: "shellDirectory",
      },
      {
        Header: "Shell Script",
        accessor: "shell",
      }
    ];
    return(
      <form onSubmit={this.submitHandler.bind(this)}>
        <h2>BATCH FILE</h2>
        <div className="Files">
          <Files className='files-dropzone'
                 onChange={this.onFileChange.bind(this)}
                 onError={this.onFileError}
                 accepts={['.csv']}
                 multiple
                 maxFileSize={100000000}
                 minFileSize={0}
                 clickable
            >
            <p>Drop CSV file here or click to Upload</p>
          </Files>
        </div>
        <br />
        <input type="submit" className="batch-submit" value="Submit" disabled={!(this.state.batchJson.length > 0)} />
        <div id='batch-table'>
          <BatchTable data={this.state.batchRow} columns={columns} filename='Please select a file' rowNum={0} /> 
        </div>
      </form>
    );
  }

}

export default BatchForm