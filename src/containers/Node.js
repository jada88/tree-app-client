import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import * as actions from '../actions'

let mainTreeArray = [];

export class Node extends Component {
  handleAddChildClick = (e, num, expanded, id, parentId) => {
    e.preventDefault()  
    const treeUlElement = `tree-ul-${num}`;
    let elementExists = document.getElementById(treeUlElement);
    if(elementExists != null && elementExists.childElementCount > 0 && elementExists.style.display == "block"){
      elementExists.style.display = "none";
    } else if(elementExists != null && elementExists.childElementCount > 0 && elementExists.style.display == "none"){
      elementExists.style.display = "block";
    } else {
      elementExists.style.display = "block";
      axios.get(`http://localhost:5000/api/traverse?node=${num}`, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'same-origin',
      }).then(
        res => {
          const { changeNode, addChild, createNode, id, num } = this.props     
          mainTreeArray.push(res.data);
          if(mainTreeArray && mainTreeArray != null){
            let innerTreeArray = mainTreeArray[0];
            if(innerTreeArray && innerTreeArray != null){
              let childsArray = innerTreeArray.childs;
              if(childsArray && childsArray != null && childsArray.length > 0){
                for (let i = 0; i < childsArray.length; i++) {
                  const childId = createNode(childsArray[i].name, childsArray[i].id).nodeId
                  addChild(id, childId, true)
                } 
                mainTreeArray = [];
              }
            }
          }               
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  renderChild = childId => {
    const { id } = this.props
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} />
      </li>
    )
  }

  render() {
    const { name, num, expanded, id, parentId, childIds } = this.props
    return (
        <div>
            <span onClick={(e) => this.handleAddChildClick(e, num, expanded, id, parentId)}>+</span>
            {name}            
            <ul id={`tree-ul-${num}`}>
                {childIds.map(this.renderChild)}
            </ul>
        </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(Node)
export default ConnectedNode