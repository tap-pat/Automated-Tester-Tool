import React, { Component } from 'react';
import '../css/App.css';

class LoadHeader extends Component
{
  
  render()
  {
    return (
		<div className="Div-header">
			<header className="App-header">
	            <title> Automated Tester Tool </title>
				<p className="App-user">「こんにちは」 Tester! </p>
				<h1 className="App-title"> AMO - Automated Tester Tool </h1>
			</header>
		</div>
    );
  }

}

export default LoadHeader;