import React, { useState } from "react";
var axios = require("axios");
const STATIC_URL = "https://twitter-server-123.herokuapp.com";
function Twitter() {
  let [user1, updateUser1] = useState("");
  let [user2, updateUser2] = useState("");
  let [mutualFriends, updateMutualFriends] = useState([]);

  let infoToShow = <h5>Loading...</h5>;

  return (
    <React.Fragment>
      <form>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="User 1"
              value={user1}
              onChange={event => updateUser1(event.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="User 2"
              value={user2}
              onChange={event => updateUser2(event.target.value)}
            />
          </div>
        </div>
        <div className="btn-group">
          <button
            style={{ marginTop: "50px", marginLeft: "470px" }}
            type="button"
            className="btn btn-primary center-block"
            onClick={() => findMututalFriends()}
          >
            Submit
          </button>
          <button
            style={{ marginTop: "50px", marginLeft: "10px" }}
            type="button"
            className="btn btn-primary center-block"
            onClick={() => clearInputs()}
          >
            Clear
          </button>
        </div>
      </form>
      <hr />
      <ul className="list-group" style={{ marginBottom: "50px" }}>
        {renderMutualFriendsList()}
      </ul>
    </React.Fragment>
  );

  async function findMututalFriends() {
    try {
      const url = `${STATIC_URL}/friends/mutual/${user1}/${user2}`;
      const res = await axios.get(url);
      if (res.data.status && res.data.mutualFriends.length > 0) {
        updateMutualFriends(res.data.mutualFriends);
      } else {
        if (res.data.message) {
          infoToShow = res.data.message;
          updateMutualFriends([]);
          return;
        }
        throw new Error();
      }
    } catch (err) {
      infoToShow = <h5>No Mutual Friends Found</h5>;
      updateMutualFriends([]);
    }
  }

  function renderMutualFriendsList() {
    if (mutualFriends.length === 0) {
      return infoToShow;
    }
    return mutualFriends.map((item, index) => (
      <li key={index} className="list-group-item">
        {item}
      </li>
    ));
  }

  function clearInputs() {
    infoToShow = <h5>Loading...</h5>;
    updateUser1("");
    updateUser2("");
    updateMutualFriends([]);
  }
}

export default Twitter;
