import React from "react";
import { compose } from "redux";
import withEditorInteractions from "../withEditorInteractions";
import { withHotkeys } from "teselagen-react-components";
import getCommands from "../commands";
import { getCommandHotkeys, getCommandHandlers } from "../utils/commandUtils"

class CommandHotkeyHandler extends React.Component {
  constructor(props) {
    super(props);
    const commands = getCommands(this);
    // Don't bind clipboard shortcuts (use native ones directly)
    ['cut', 'copy', 'paste'].forEach(cmdId => delete commands[cmdId]);
    this.hotkeyDefs = getCommandHotkeys(commands);
    this.handlers = getCommandHandlers(commands);
    this.Handler = withHotkeys(this.hotkeyDefs, this.handlers)();
  }

  render() {
    return <this.Handler />;
  }
}

export default compose(withEditorInteractions)(CommandHotkeyHandler);
