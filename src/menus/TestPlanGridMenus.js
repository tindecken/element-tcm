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

class StepMenu extends ContextMenu {
  constructor() {
    super([
      {label: "Edit", event: "editStep", icon: path.join(__static, 'icons/edit.png'),},
      {label: "Cut", event: "cutStep", icon: path.join(__static, 'icons/cut.png')},
      {label: "Copy", event: "copyStep", icon: path.join(__static, 'icons/copy.png')},
      {label: "Paste", event: "pasteStep", icon: path.join(__static, 'icons/paste.png')},
      {type: "separator"},
      {label: "Insert", event: "insertStep", icon: path.join(__static, 'icons/insert.png')},
      {label: "Insert and Paste", event: "insertAndPasteStep", icon: path.join(__static, 'icons/insertandpaste.png')},
      {type: "separator"},
      {label: "Delete", event: "deleteStep", icon: path.join(__static, 'icons/remove.png')},
      {label: "Enable", event: "enableStep", icon: path.join(__static, 'icons/enable.png')},
      {label: "Disable", event: "disableStep", icon: path.join(__static, 'icons/disable.png')},
    ]);
  }
}


export {
  StepMenu
};
