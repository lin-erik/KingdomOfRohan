import React from 'react';

class GoogleMapsComponent extends React.Component {
  constructor(props){
    super(props);

    // bind methods here
  }

  // place methods here

  render(){
    return(
      <div className='google-maps-container'>
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe width="100%" height="300" id="gmap_canvas"
            src={`https://maps.google.com/maps?q=AMC%20Theaters&output=embed`} frameBorder="0" scrolling="yes" marginHeight="0" marginWidth="0">
            </iframe>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleMapsComponent
