import React, { Component } from 'react';
import SingleForm from './Sub-components/SingleForm';
import BatchForm from './Sub-components/BatchForm';
import SettingsForm from './Sub-components/SettingsForm';
import HistoryForm from './Sub-components/HistoryForm';
import '../css/App.css';

class DisplayPanel extends Component
{
  
  getDiv(divID)
  {
    if(divID === 0)
    {
      //History
      return(
        <div className="display-section">
          <HistoryForm />
        </div>
      );
    }
    else if(divID === 1)
    {
      //Single File
      return(
        <div className="display-section">
          <SingleForm />
        </div>
      );
    }
    else if(divID === 2)
    {
      //Batch File
      return(
        <div className="display-section">
          <BatchForm />
        </div>
      );
    }
    else if(divID === 3)
    {
      //Settings
      return(
        <div className="display-section">
          <SettingsForm />
        </div>
      );
    }
    else
    {
      //Error Handling
      return(
        <div className="display-section">
          <h2>DISPLAY ERROR</h2>
        </div>
      );
    }
  }

  render()
  {
    return (
      this.getDiv(this.props.divId)
    );
  }

}

export default DisplayPanel;
