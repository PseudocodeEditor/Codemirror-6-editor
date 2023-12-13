import {keymap} from "@codemirror/view";
import {acceptCompletion} from "@codemirror/autocomplete";
import {defaultKeymap, indentLess, indentMore} from "@codemirror/commands";
import { Prec } from "@codemirror/state";

import {deleteFile} from "../files/delete";
import {downloadFile} from "../files/download.js";


export const shortcuts = Prec.highest(keymap.of([
  {
    key: "Tab",
    preventDefault: true,
    run: acceptCompletion,
  },
  {
    key: "Tab",
    preventDefault: true,
    run: indentMore,
  },
  {
    key: "Shift-Tab",
    preventDefault: true,
    run: indentLess,
  },
  {
    key: "Mod-s",
    preventDefault: true,
    run: () => {
      const active = document.querySelector(".file-title.active");
      downloadFile(active);
    }
  },      
  {
    key: "Mod-o",
    preventDefault: true,
    run: () => { document.querySelector("#hidden-file-input").click(); }
  },
  {
    key: "Mod-Shift-Backspace",
    preventDefault: true,
    run: () => {
      deleteFile(document.querySelector(".file-title.active"));
      // Remove focus from editor
      const i = document.createElement("input")
      document.body.appendChild(i);
      i.focus();
      i.remove();
    }
  },
  {
    key: "Mod-Enter",
    preventDefault: true,
    run: () => {
      const button = document.querySelector("#run-button");
      button.click();
      return true; // Stop the default keymap of creating a new line from running
    }
  },
  ...defaultKeymap
]))
