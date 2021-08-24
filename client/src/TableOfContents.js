import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';
import { white } from 'material-ui/styles/colors';
import {
  Toolbar, ToolbarGroup, FlatButton, Drawer, IconButton,
} from 'material-ui';
import Settings from 'material-ui/svg-icons/action/settings';
import MoveToInbox from 'material-ui/svg-icons/content/move-to-inbox';
import { openDocumentPopover, closeDocumentPopover, toggleSidebar } from './modules/project';
import { createTextDocument, createCanvasDocument } from './modules/documentGrid';
import { createFolder } from './modules/folders';
import AddDocumentButton from './AddDocumentButton';
import LinkableList from './LinkableList';

class TableOfContents extends Component {
  render() {
    const {
      sidebarWidth, sidebarOpen, adminEnabled, projectId, contentsChildren, openDocumentIds, writeEnabled,
    } = this.props;

    return (
      <Drawer open={sidebarOpen} width={sidebarWidth}>
        <div style={{
          minHeight: '100%', paddingTop: '72px', display: 'flex', alignItems: 'stretch',
        }}
        >
          <div style={{ flexGrow: '1' }}>
            { writeEnabled
              && (
              <Toolbar noGutter style={{ marginLeft: 10, background: white }}>
                <ToolbarGroup>
                  <AddDocumentButton
                    label="New Item"
                    documentPopoverOpen={this.props.documentPopoverOpen}
                    openDocumentPopover={() => this.props.openDocumentPopover('tableOfContents')}
                    closeDocumentPopover={this.props.closeDocumentPopover}
                    textClick={() => { this.props.createTextDocument(projectId, 'Project'); }}
                    imageClick={() => { this.props.createCanvasDocument(projectId, 'Project'); }}
                    idString="tableOfContents"
                  />
                  <FlatButton
                    label="New Folder"
                    icon={<CreateNewFolder />}
                    onClick={() => { this.props.createFolder(projectId, 'Project'); }}
                  />
                  <IconButton
                    onClick={this.props.checkInAllClick}
                    style={{ width: '44px', height: '44px', marginLeft: '6px' }}
                    iconStyle={{ width: '20px', height: '20px' }}
                    tooltip="Check In All Documents"
                  >
                    <MoveToInbox />
                  </IconButton>
                  { adminEnabled
                    && (
                    <IconButton
                      onClick={this.props.settingsClick}
                      style={{ width: '44px', height: '44px', marginLeft: '6px' }}
                      iconStyle={{ width: '20px', height: '20px' }}
                      tooltip="Project Settings"
                    >
                      <Settings />
                    </IconButton>
                    )}
                </ToolbarGroup>
              </Toolbar>
              )}
            <LinkableList
              items={contentsChildren}
              inContents
              openDocumentIds={openDocumentIds}
              allDraggable={writeEnabled}
              writeEnabled={writeEnabled}
              adminEnabled={adminEnabled}
            />
          </div>
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  documentPopoverOpen: state.project.documentPopoverOpenFor === 'tableOfContents',
  projectId: state.project.id,
  sidebarOpen: state.project.sidebarOpen,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  openDocumentPopover,
  closeDocumentPopover,
  createTextDocument,
  createCanvasDocument,
  createFolder,
  toggleSidebar,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TableOfContents);
