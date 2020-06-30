const tree = [
  {
    id: 1,
    name: '节点1',
    children: [
      {
        id: 2,
        name: '节点1-1',
        children: [
          {
            id: 4,
            name: '节点1-1-1'
          }
        ]
      },
      {
        id: 3,
        name: '节点1-2',
        children: []
      }
    ]
  },
  {
    id: 5,
    name: '节点2',
    children: []
  }
]

class MenuTree {
  // 节点拷贝
  cloneNode (oldNode, newNode) {
    let attrs = Object.keys(oldNode)
    attrs.forEach(v => {
      newNode[v] = oldNode[v]
    })
    return newNode;
  }
  // 判断是否满足过滤条件
  checkNodeEquals (node, name) {
    if (node.name && node.name.indexOf(name) !== -1) {
      return true;
    }
    return false;
  }
  // 过滤函数
  filter (menu, name) {
    let menuNew = [];
    for (let i = 0; i < menu.length; i++) {
      let nodeNew,
        node = menu[i],
        childrenModule = node.children,
        childrenMenuModule = [];
      if (childrenModule && childrenModule.length > 0) {
        childrenMenuModule = this.filter(childrenModule, name);
      }
      if (childrenMenuModule && childrenMenuModule.length > 0) {
        nodeNew = {};
        nodeNew = this.cloneNode(node, nodeNew);
        nodeNew.children = childrenMenuModule;
      } else {
        if (this.checkNodeEquals(node, name)) {
          nodeNew = {};
          nodeNew = this.cloneNode(node, nodeNew);
        }
      }
      if (nodeNew) {
        menuNew.push(nodeNew);
      }
    }
    return menuNew
  }
}

const filter = new MenuTree()
let result = filter.filter(tree, '2')

console.log(JSON.stringify(result))