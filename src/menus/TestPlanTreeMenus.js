"use strict";
const remote = require('electron').remote;
const {Menu, MenuItem} = remote;

const EventEmitter = require('events');

class ContextMenu extends EventEmitter {
    constructor(items) {
        super();
        this.extraData = null;
        this.menu = new Menu();
        for(const item of items) {
            const event = item.event || item.label;
            const menuItem = new MenuItem({
                label: item.label,
                click: () => {
                    this.emit(event, this.extraData);
                },
                type: item.type || "normal"
            });
            this.menu.append(menuItem);
        }
    }

    toggle(extraData) {
        if(extraData !== undefined) this.extraData = extraData;
        this.menu.popup({window: remote.getCurrentWindow(), callback: () => {
          this.emit("close", this.extraData);
          this.removeAllListeners();
        }});
    }
}

class CategoryMenu extends ContextMenu {
    constructor() {
        super([
            {label: "New Catgory", event: "newCategory"},
            {label: "New Test Suite", event: "newTestSuite"},
            {type: "separator"},
            {label: "Edit", event: "editCategory"},
            {label: "Delete", event: "deleteCategory"},
            {label: "Properties", event: "propertiesCategory"},
        ]);
    }
}

export {
  CategoryMenu,
};
