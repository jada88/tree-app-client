export default function generateTree() {
    let tree = {
      0: {
        id: 0,
        num: 0,
        name: 'folder0',
        childs: [1],
        childIds: [1]
      }
    }
  
    tree[1] = {
        id: 1,
        num: 1,
        name: 'game-of-thrones-family-tree',
        expanded: false,
        childs: [2,3,4,5,6,7,8,9],
        childIds: []
    }
    return tree
  }