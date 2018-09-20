import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

const API = 'http://10.215.147.55:3000/history';
/* const API = 'https://localhost:1234/jobsPage'; */

class HistoryForm extends Component
{
  constructor(props)
  {
    super(props);
	
	this.state = {
		jobs: [],
	};
  }
  
  changeHandler = event => {
    if(event.target.name === "jenkinsjobid")
    {
      this.setState({ jenkinsjobid: event.target.value });
    }
    if(event.target.name === "jobshellscript")
    {
      this.setState({ jobshellscript: event.target.value });
    }
    if(event.target.name === "jobjcl")
    {
      this.setState({ jobjcl: event.target.value });
    }
    if(event.target.name === "execdate")
    {
      this.setState({ execdate: event.target.value });
    }
    if(event.target.name === "jobstatus")
    {
      this.setState({ jobstatus: event.target.value });
    }
    if(event.target.name === "username")
    {
      this.setState({ username: event.target.value });
    }
  }

  submitHandler = event => {
      event.preventDefault();
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ jobs: data }));
  }
  
  render()
  {
    const { jobs } = this.state

    const columns = [
      {
        Header: 'Baseline',
        accessor: 'baseline_job',
      },
      {
        Header: 'Target',
        accessor: 'target_job',
      },
      {
        Header: 'Last Run Job Number',
        accessor: 'job_number',
      },      
      {
        Header: 'Last Run',
        accessor: 'last_rundate',
      },
      {
        Header: 'Last Status',
        accessor: 'laststatus',
      },
      {
        Header: 'Statistics (P/F/T)',
        accessor: 'statistic', // Pass/Fail/Total Run
      } 
    ]

    return(
      <form>
        <h2>HISTORY</h2>
        <br />
        <div>
          <ReactTable
            data = {jobs}
            columns = {columns}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </div>
      </form>
    );
  }

}

export default HistoryForm;
