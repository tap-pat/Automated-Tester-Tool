import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class BatchTable extends Component
{
  render()
  {
    return(
      <div>
        <label>Filename: {this.props.filename}</label>
        <br />
        <label>Row Count: {this.props.rowNum}</label>
        <br /><br /> 
        <ReactTable
          data={this.props.data}
          columns={this.props.columns}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default BatchTable
