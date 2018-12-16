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
        type: item.type || "normal",
        submenu: [
          { label: '1', type: "normal" },
          { label: '2', type: "normal" }
        ]
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

class TestSuiteMenu extends ContextMenu {
  constructor() {
    super([
      {label: "New Test Group", event: "newTestGroup"},
      {label: "New Test Case", event: "newTestCase"},
      {type: "separator"},
      {label: "Edit", event: "editTestSuite"},
      {label: "Delete", event: "deleteTestSuite"},
      {label: "Properties", event: "propertiesTestSuite"},
    ]);
  }
}

class TestGroupMenu extends ContextMenu {
  constructor() {
    super([
      {label: "New Test Case", event: "newTestCase"},
      {type: "separator"},
      {label: "Edit", event: "editTestGroup"},
      {label: "Delete", event: "deleteTestGroup"},
      {label: "Properties", event: "propertiesTestGroup"},
    ]);
  }
}

class TestCaseMenu extends ContextMenu {
  constructor() {
    super([
      {label: "Edit", event: "editTestCase"},
      {label: "Enable", event: "enableTestCase"},
      {label: "Disable", event: "disableTestCase"},
      {type: "separator"},
      {label: "Primary", event: "setPrimaryTestCase", type: 'checkbox', checked: true},
      {label: "Dependency", event: "setDependencyTestCase", submenu: [
        { label: '1', type: 'normal' },
        { label: '2', type: 'normal' }
      ]},
      {type: "separator"},
      {label: "Delete", event: "deleteTestCase"},
      {label: "Properties", event: "propertiesTestCase"},
    ]);
  }
}

export {
  CategoryMenu, TestSuiteMenu, TestGroupMenu, TestCaseMenu
};
