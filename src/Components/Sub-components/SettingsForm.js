import React, { Component } from 'react';
import './SettingsForm.css';

class SettingsForm extends Component
{
  
  formSubmitHandler(e)
  {
    alert('Not Yet Implemented');
    e.preventDefault();
  }

  render()
  {
    return(
      <form className="setting-form" onSubmit={this.formSubmitHandler.bind(this)}>
        <h2>SETTINGS</h2>
        <h4>Jenkins Setup</h4>
        <a>
        <label>IP Address: </label>
        <input type="text" ref="jenkinsIP" />
        </a>
        <br />
        <a>
        <label>Username: </label>
        <input type="text" ref="jenkinsUser" />
        </a>
        <br />
        <a>
        <label>Password: </label>
        <input type="text" ref="jenkinsPassword" />
        </a>
        <br />
        <a>
        <input type="submit" value="Submit" />
        </a>
      </form>    
    );
  }

}

export default SettingsForm;
