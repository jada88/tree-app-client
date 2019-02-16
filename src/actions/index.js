export const CREATE_NODE = 'CREATE_NODE'
export const ADD_CHILD = 'ADD_CHILD'

let nextId = 0
export const createNode = (name, num) => ({  
  type: CREATE_NODE,
  name: name,
  num: num,
  expanded: false,
  nodeId: `new_${nextId++}`
})

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId
})
