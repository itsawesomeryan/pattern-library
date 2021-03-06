'use strict';

import delegate from 'delegate';
import activateTab from './utils/activate-tab';
import getPanel from './utils/get-panel';

module.exports = () => {
  /**
   * Clicks on tabs
   */

  delegate(document.body, '.dqpl-tablist .dqpl-tab', 'click', (e) => {
    activateTab(e.delegateTarget);
  });

  /**
   * Keydowns on tabs
   */

  delegate(document.body, '.dqpl-tablist .dqpl-tab', 'keydown', (e) => {
    const which = e.which;
    const tab = e.target;

    switch (which) {
      case 37:
      case 38:
        e.preventDefault();
        activateTab(tab, 'prev');
        break;
      case 39:
      case 40:
        e.preventDefault();
        activateTab(tab, 'next');
        break;
      case 34: // page down
        e.preventDefault();
        const panel = getPanel(e.target);
        if (panel) {
          panel.tabIndex = -1; // ensure its focusable
          panel.focus();
        }
        break;
    }
  });

  /**
   * Keydowns on panel
   * shortcut for page up to focus panel's tab
   */

  delegate(document.body, '.dqpl-panel', 'keydown', (e) => {
    if (e.which !== 33) { return; }
    const panel = e.target;
    const tab = document.querySelector(`[aria-controls="${panel.id}"]`);
    if (tab) { tab.focus(); }
  });
};
