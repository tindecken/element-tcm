"use strict";
const remote = require('electron').remote;
const {Menu, MenuItem} = remote;
import path from 'path'

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
        ],
        icon: item.icon
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
      {label: "New Catgory", event: "newCategory", icon: path.join(__static, 'icons/add.png'),},
      {label: "New Test Suite", event: "newTestSuite", icon: path.join(__static, 'icons/add.png')},
      {type: "separator"},
      {label: "Edit", event: "editCategory", icon: path.join(__static, 'icons/edit.png')},
      {label: "Delete", event: "deleteCategory", icon: path.join(__static, 'icons/remove.png')},
      {label: "Properties", event: "propertiesCategory", icon: path.join(__static, 'icons/properties.png')},
    ]);
  }
}

class TestSuiteMenu extends ContextMenu {
  constructor() {
    super([
      {label: "New Test Group", event: "newTestGroup", icon: path.join(__static, 'icons/add.png')},
      {label: "New Test Case", event: "newTestCase", icon: path.join(__static, 'icons/add.png')},
      {type: "separator"},
      {label: "Edit", event: "editTestSuite", icon: path.join(__static, 'icons/edit.png')},
      {label: "Delete", event: "deleteTestSuite", icon: path.join(__static, 'icons/remove.png')},
      {label: "Properties", event: "propertiesTestSuite", icon: path.join(__static, 'icons/properties.png')},
    ]);
  }
}

class TestGroupMenu extends ContextMenu {
  constructor() {
    super([
      {label: "New Test Case", event: "newTestCase", icon: path.join(__static, 'icons/add.png')},
      {type: "separator"},
      {label: "Edit", event: "editTestGroup", icon: path.join(__static, 'icons/edit.png')},
      {label: "Delete", event: "deleteTestGroup", icon: path.join(__static, 'icons/remove.png')},
      {label: "Properties", event: "propertiesTestGroup", icon: path.join(__static, 'icons/properties.png')},
    ]);
  }
}

class TestCaseMenu extends ContextMenu {
  constructor() {
    super([
      {label: "Edit", event: "editTestCase", icon: path.join(__static, 'icons/edit.png')},
      {label: "Enable", event: "enableTestCase", icon: path.join(__static, 'icons/enable.png')},
      {label: "Disable", event: "disableTestCase", icon: path.join(__static, 'icons/disable.png')},
      {type: "separator"},
      {label: "Primary", event: "setPrimaryTestCase", type: 'checkbox', checked: true},
      {label: "Dependency", event: "setDependencyTestCase", submenu: [
        { label: '1', type: 'normal' },
        { label: '2', type: 'normal' }
      ]},
      {type: "separator"},
      {label: "Delete", event: "deleteTestCase", icon: path.join(__static, 'icons/remove.png')},
      {label: "Properties", event: "propertiesTestCase", icon: path.join(__static, 'icons/properties.png')},
    ]);
  }
}

export {
  CategoryMenu, TestSuiteMenu, TestGroupMenu, TestCaseMenu
};
