export type Tree<T> = {
    kind: "leaf";
  } | {
    kind: "node";
    left: Tree<T>;
    value: T;
    right: Tree<T>;
};

export function createNode<T>(value: T): Tree<T> {
    return {
      kind: "node",
      left: { kind: "leaf" },
      value,
      right: { kind: "leaf" }
    };
}

function insert<T>(tree: Tree<T>, value: T): Tree<T> {
    if (tree.kind === "leaf") {
      return createNode(value);
    } else if (value < tree.value) {
      return {
        ...tree,
        left: insert(tree.left, value)
      };
    } else if (value > tree.value) {
      return {
        ...tree,
        right: insert(tree.right, value)
      };
    } else {
      return tree; // Value already exists in tree
    }
  }
  