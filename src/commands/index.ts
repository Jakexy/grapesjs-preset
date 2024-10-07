import type { Editor } from 'grapesjs';
// import CommandObject from 'grapesjs';
import { RequiredPluginOptions } from '..';
import {
  cmdClear,
  cmdDeviceDesktop,
  cmdDeviceMobile,
  cmdDeviceTablet,
  TARGET_PANEL_ID,
} from './../consts';
import openImport from './openImport';


export default (editor: Editor, config: RequiredPluginOptions) => {
  const { Commands } = editor;
  const txtConfirm = config.textCleanCanvas;

  openImport(editor, config);

  Commands.add(cmdDeviceDesktop, {
    run: ed => ed.setDevice('Desktop'),
    stop: () => {},
  });
  Commands.add(cmdDeviceTablet, {
    run: ed => ed.setDevice('Tablet'),
    stop: () => {},
  });
  Commands.add(cmdDeviceMobile, {
    run: ed => ed.setDevice('Mobile portrait'),
    stop: () => {},
  });
  editor.Commands.add('ola-override', (function () {
    // Shared state variable
    let layers: HTMLElement | null = null;
  
    return {
      // run(editor: any) {
      //   const lm = editor.LayerManager;
      //   const pn = editor.Panels;
      //   const lmConfig = lm.getConfig();
  
      //   if (lmConfig.appendTo) return;
  
      //   if (!layers) {
      //     const id = 'views-container';
      //     const layersElement = document.createElement('div');
      //     // @ts-ignore
      //     const panels = pn.getPanel(id) || pn.addPanel({ id });
  
      //     if (lmConfig.custom) {
      //       lm.__trgCustom({ container: layersElement });
      //     } else {
      //       layersElement.appendChild(lm.render());
      //     }
  
      //     panels.set('appendContent', layersElement).trigger('change:appendContent');
      //     layers = layersElement; // Assign to the shared variable
      //   }
  
      //   layers.style.display = 'block';
      // },
      run(editor: any) {
        // console.log(editor.Panels);

        const lm = editor.LayerManager;
        const pn = editor.Panels;
        const lmConfig = lm.getConfig();

        let xxx = pn.getPanel(TARGET_PANEL_ID);
        console.log("panel");
        console.log(xxx);
  
        // Exit if 'appendTo' is configured
        if (lmConfig.appendTo) return;
  
        // If layers are not initialized, create and append them
        if (!layers) {
          // Create the layers container
          const layersElement = document.createElement('div');
          layersElement.id = 'my-custom-layers'; // Optional: Assign an ID for easier debugging
  
          // Attempt to get the target panel; create it if it doesn't exist
          let panel = pn.getPanel(TARGET_PANEL_ID);
          if (!panel) {
            panel = pn.addPanel({
              id: TARGET_PANEL_ID,
              // Optionally, you can set other panel properties like buttons, etc.
              // buttons: [{ id: 'close-panel', command: 'close-my-custom-panel', ... }]
            });
          }
  
          // Configure the LayerManager to use the new layers container
          if (lmConfig.custom) {
            lm.__trgCustom({ container: layersElement });
          } else {
            layersElement.appendChild(lm.render());
          }
  
          // Append the layers to the target panel's content
          panel.set('appendContent', layersElement).trigger('change:appendContent');
          layers = layersElement; // Assign to the shared variable
        }
  
        // Make sure the layers are visible
        layers.style.display = 'block';
      },
      stop() {
        if (layers) {
          layers.style.display = 'none';
        }
      },
    };
  })());
}
