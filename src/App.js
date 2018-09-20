import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoadHeader from './Components/LoadHeader';
import LoadFooter from './Components/LoadFooter';
import CurrentDisplay from './Components/DisplayPanel';

import './css/App.css';

import PanelHistory from './images/panel-history-blue.png'
import PanelSingle from './images/panel-single-blue.png'
import PanelBatch from './images/panel-batch-blue.png'
import PanelSetting from './images/panel-setting-blue.png'

class App extends Component
{
  constructor()
  {
    super();

    this.state =
    {
      menuOptions: []
    }
  }

  setInitialState()
  {
    this.state =
    {
      menuOptions:
      [
        {
          text:'History',
          status:'active'
        },
        {
          text:'Single File',
          status:'inactive'
        },
        {
          text:'Batch File',
          status:'inactive'
        },
        {
          text:'Settings',
          status:'inactive'
        }
      ]
    }
  }

  componentWillMount()
  {
    this.setInitialState();
	document.title = "Automated Tester Tool"
  }

  /* Hover doesn't work yet :( */
  menuHoverHandler(index)
  {
    let hovBot = this.state.menuOptions;
    let hovState = 'hover';
    let currHover = hovBot.findIndex(x => x.status === 'hover');
    let currActive = hovBot.findIndex(x => x.status === 'active');
    
    if(currHover === currActive)
    {
      hovState = 'active';
    }
    else
    {
      hovState = 'inactive';
    }
    hovBot[currHover].status = hovState;
    hovBot[index].status = 'hover';

    this.state = this.setState({hovBot:hovBot});
  }
  
  menuClickHandler(index)
  {
    let buttons = this.state.menuOptions;
    let currActive = buttons.findIndex(x => x.status === 'active');

    this.state.menuOptions[currActive].status = 'inactive';
    this.state.menuOptions[index].status = 'active';

    this.state = this.setState({buttons:buttons});

    ReactDOM.render(<CurrentDisplay divId={index} />, document.getElementById('current-display'));

  }

  render()
  {
    return (
      <div className="App">
	  
        <LoadHeader />

        <div class="vertical-menu">
          <a href="#" className={this.state.menuOptions[0].status} onClick={this.menuClickHandler.bind(this, 0)}><img src={PanelHistory} className="image-panel" />{this.state.menuOptions[0].text}</a> 
          <a href="#" className={this.state.menuOptions[1].status} onClick={this.menuClickHandler.bind(this, 1)}><img src={PanelSingle} className="image-panel" />{this.state.menuOptions[1].text}</a>
          <a href="#" className={this.state.menuOptions[2].status} onClick={this.menuClickHandler.bind(this, 2)}><img src={PanelBatch} className="image-panel" />{this.state.menuOptions[2].text}</a>
          <a href="#" className={this.state.menuOptions[3].status} onClick={this.menuClickHandler.bind(this, 3)}><img src={PanelSetting} className="image-panel" />{this.state.menuOptions[3].text}</a>
        </div>

        <div id="current-display">
          <CurrentDisplay divId={0}/>
        </div>

		<LoadFooter />
      </div>
    );
  }
}

export default App;
