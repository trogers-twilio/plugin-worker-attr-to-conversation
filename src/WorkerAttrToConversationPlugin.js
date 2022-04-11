import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import { injectGlobal } from 'react-emotion';

// Increasing the width of the Team View WorkerPanel to show full skill name
import global from './styles/global.css';
injectGlobal`
  ${global}
`;

const PLUGIN_NAME = 'WorkerAttrToConversationPlugin';

export default class WorkerAttrToConversationPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    flex.Actions.addListener('beforeCompleteTask', async payload => {
      const { task } = payload;
      const { attributes } = task;

      const { attributes: workerAttributes } = manager.workerClient;

      const newAttributes = {
        ...attributes,
        conversations: {
          ...attributes.conversations,
          conversation_attribute_9: workerAttributes.location,
          conversation_attribute_10: workerAttributes.manager
        }
      };

      await task.setAttributes(newAttributes);
    })
  }
}
