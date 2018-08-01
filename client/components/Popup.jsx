import React from "react";
import Modal from "react-responsive-modal";
import { MoonLoader } from "react-spinners";

const Popup = props => {
  if (props.loading) {
    return (
      <Modal open={props.open} onClose={props.onCloseModal} center>
        <div style={{ margin: 'auto', align: "center" }}>
          <center>
            <MoonLoader color={"#ADD8E6"} loading={props.loading} />
          </center>
        </div>

        <br />
        <h6>{props.imdb.plot}</h6>
        <hr />
        <div>
          <h2>{props.imdb.actors}</h2>

          <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
            {props.imdb.country}
          </h2>
          <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
            {props.imdb.runtime}
          </h2>
          <h2 style={{ display: "inline-block" }}>{props.imdb.rated}</h2>
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal open={props.open} onClose={props.onCloseModal} center>
        <div>
          <iframe
            style={{ height: "300px", width: "100%" }}
            className="embed-responsive-item"
            src={"https://www.youtube.com/embed/" + props.trailer_key}
            allowFullScreen
          />
        </div>
        <br />
        <h6>{props.imdb.plot}</h6>
        <hr />
        <div>
          <h2>{props.imdb.actors}</h2>

          <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
            {props.imdb.country}
          </h2>
          <h2 style={{ display: "inline-block", paddingRight: "250px" }}>
            {props.imdb.runtime}
          </h2>
          <h2 style={{ display: "inline-block" }}>{props.imdb.rated}</h2>
        </div>
      </Modal>
    );
  }
};

export default Popup;
