import React, { Component } from "react";
import LoadingSpinner from "./LoadingSpinner";
import styled from "styled-components";
var axios = require("axios");
const STATIC_URL = "https://twitter-server-123.herokuapp.com";

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

class Twitter extends Component {
  constructor(props) {
    console.log("inside constructor");
    super(props);
    this.state = { user1: "", user2: "", mutualFriends: [], loading: false };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
    console.log("Inside ComponentDidMount");
    console.log(this.inputRef);
  }

  componentDidUpdate(prevProps, preState) {
    console.log("inside componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("inside componentWillUnmount");
  }

  findMututalFriends(event) {
    event.preventDefault();
    this.setState({ loading: true }, async () => {
      try {
        const url = `${STATIC_URL}/friends/mutual/${this.state.user1}/${this.state.user2}`;
        const res = await axios.get(url);
        if (res.data.status && res.data.mutualFriends.length > 0) {
          this.infoToShow = <h5 className="text-center">Mutual Friends</h5>;

          this.setState({
            mutualFriends: res.data.mutualFriends,
            loading: false
          });
        } else {
          if (res.data.message) {
            this.infoToShow = (
              <h5 className="text-danger text-center">{res.data.message}</h5>
            );
            this.setState({ mutualFriends: [], loading: false });
            return;
          }
          throw new Error();
        }
      } catch (err) {
        this.infoToShow = (
          <h5 className="text-center">No Mutual Friends Found</h5>
        );
        this.setState({ mutualFriends: [], loading: false });
      }
    });
  }

  renderMutualFriendsList() {
    return this.state.mutualFriends.map((item, index) => (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.screen_name}</td>
        <td>
          {item.location || (
            <LoadingSpinner dataToHide={true} floatLeft={true} />
          )}
        </td>
      </tr>
    ));
  }

  clearInputs() {
    this.infoToShow = "";
    this.inputRef.current.focus();
    this.setState({ user1: "", user2: "", mutualFriends: [] });
  }

  render() {
    console.log("inside render");
    return (
      <React.Fragment>
        <form>
          <div className="form-row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="User 1"
                ref={this.inputRef}
                value={this.state.user1}
                onChange={event => this.setState({ user1: event.target.value })}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="User 2"
                value={this.state.user2}
                onChange={event => this.setState({ user2: event.target.value })}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="btn-group">
              <Button
                style={{ width: "10rem", marginTop: "50px" }}
                type="submit"
                className="btn btn-primary"
                onClick={event => this.findMututalFriends(event)}
              >
                Submit
              </Button>
              <Button
                style={{
                  width: "10rem",
                  marginTop: "50px",
                  marginLeft: "10px"
                }}
                type="button"
                className="btn btn-primary"
                onClick={() => this.clearInputs()}
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
        <br />
        {this.state.loading ? <LoadingSpinner /> : this.infoToShow}
        <table className="table table-striped" style={{ marginBottom: "50px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>LOCATION</th>
            </tr>
          </thead>
          <tbody>{this.renderMutualFriendsList()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Twitter;
