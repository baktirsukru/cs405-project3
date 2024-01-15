/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Calculate the transformation for this node
        var transformationMatrix = this.trs.getTransformationMatrix();

        // Update matrices for rendering this node
        var transformedMvp = MatrixMult(mvp, transformationMatrix );
        var transformedModelView = MatrixMult(modelView, transformationMatrix);
        var transformedNormals = MatrixMult(normalMatrix, transformationMatrix);
        var transformedModel = MatrixMult(modelMatrix, transformationMatrix);

        // Draw the MeshDrawer
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Recursively draw children
        for (let child of this.children) {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
    }
}