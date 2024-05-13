import type { Config } from '@stencil/core'

export const config: Config = {
  "watch": false,
  "outputTargets": [
    {
      "type": "dist-custom-elements",
      "externalRuntime": true,
      "customElementsExportBehavior": "auto-define-custom-elements"
    }
  ],
  "namespace": "next-app"
}