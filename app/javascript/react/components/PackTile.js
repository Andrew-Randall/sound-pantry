import React, { Component } from "react"
import { Link } from "react-router"

const PackTile = props => {
  return (
    <div className="tile">
      <dd>
        <Link to={`/packs/${props.id}`}>
          <dl>
            <img src={props.img} width="5000" height="5000"/>
          </dl>
        </Link>
      </dd>
    </div>
  );
};

export default PackTile;
