import path from 'path';

import { OutputTargetAngular, ValueAccessorTypes } from './types';
import { CompilerCtx, ComponentCompilerMeta, Config } from '@stencil/core/internal';

interface ValueAccessor {
  elementSelectors: string[];
  eventTargets: [string, string][];
}

type NormalizedValueAccessors = {
  [T in ValueAccessorTypes]?: ValueAccessor;
};

function isValueAccessorType(va: any): va is ValueAccessorTypes {
  return ['text', 'radio', 'select', 'number', 'boolean'].includes(va);
}

function updateNormalizedValueAccessor(
  nva: NormalizedValueAccessors,
  type: ValueAccessorTypes,
  elementSelectors: ValueAccessor['elementSelectors'],
  eventTargets: [string, string],
) {
  const valueAccessor = nva[type] || {
    elementSelectors: [],
    eventTargets: [],
  };
  valueAccessor.elementSelectors = [...valueAccessor.elementSelectors, ...elementSelectors];
  valueAccessor.eventTargets = [...valueAccessor.eventTargets, eventTargets];

  return {
    ...nva,
    [type]: valueAccessor,
  };
}

export default async function generateValueAccessors(
  compilerCtx: CompilerCtx,
  components: ComponentCompilerMeta[],
  outputTarget: OutputTargetAngular,
  config: Config,
) {
  let normalizedValueAccessors: NormalizedValueAccessors = {};

  if (outputTarget.valueAccessorConfigs && outputTarget.valueAccessorConfigs.length > 0) {
    normalizedValueAccessors = outputTarget.valueAccessorConfigs.reduce((allAccessors, va) => {
      const elementSelectors = Array.isArray(va.elementSelectors)
        ? va.elementSelectors
        : [va.elementSelectors];
      return updateNormalizedValueAccessor(allAccessors, va.type, elementSelectors, [
        va.event,
        va.targetAttr,
      ]);
    }, normalizedValueAccessors);
  } else {
    for (let cmpMeta of components) {
      for (let event of cmpMeta.events) {
        const bindAttr = event.docs.tags.find((t) => t.name === 'bindAttr');
        const bindingTypes = event.docs.tags.filter((t) => t.name === 'bindType');

        if (bindAttr?.text && bindingTypes.length > 0) {
          const bindTypes = event.docs.tags.filter(
            (t) => t.name === 'bindType' && isValueAccessorType(t.text),
          );

          for (let bindType of bindTypes) {
            const [text, selector] = (bindType.text as string).split(' ');
            if (!isValueAccessorType(text)) {
              continue;
            }
            return updateNormalizedValueAccessor(
              normalizedValueAccessors,
              text,
              [selector],
              [bindAttr.text, event.name],
            );
          }
          if (bindTypes.length > 0) {
            break;
          }
        }
      }
    }
  }

  if (Object.keys(normalizedValueAccessors).length === 0) {
    return;
  }

  const targetDir = path.dirname(outputTarget.directivesProxyFile);

  await Promise.all(
    Object.keys(normalizedValueAccessors).map(async (type) => {
      const valueAccessorType = type as ValueAccessorTypes; // Object.keys converts to string
      const valueAccessor = normalizedValueAccessors[valueAccessorType];
      if (valueAccessor === undefined) {
        return Promise.resolve();
      }
      const targetFileName = `${type}-value-accessor.ts`;
      const targetFilePath = path.join(targetDir, targetFileName);
      const srcFilePath = path.join(
        __dirname,
        '../resources/control-value-accessors/',
        targetFileName,
      );
      const srcFileContents = await compilerCtx.fs.readFile(srcFilePath);

      const finalText = createValueAccessor(srcFileContents, valueAccessor);
      await compilerCtx.fs.writeFile(targetFilePath, finalText);
    }),
  );

  await copyResources(config, ['value-accessor.ts'], targetDir);
}

function createValueAccessor(srcFileContents: string, valueAccessor: ValueAccessor) {
  const hostContents = valueAccessor.eventTargets.map((listItem) =>
    VALUE_ACCESSOR_EVENTTARGETS.replace(VALUE_ACCESSOR_EVENT, listItem[0]).replace(
      VALUE_ACCESSOR_TARGETATTR,
      listItem[1],
    ),
  );

  return srcFileContents
    .replace(VALUE_ACCESSOR_SELECTORS, valueAccessor.elementSelectors.join(', '))
    .replace(VALUE_ACCESSOR_EVENTTARGETS, hostContents.join('\n'));
}

function copyResources(config: Config, resourcesFilesToCopy: string[], directory: string) {
  if (!config.sys || !config.sys.copy) {
    throw new Error('stencil is not properly intialized at this step. Notify the developer');
  }
  const copyTasks = resourcesFilesToCopy.map((rf) => {
    return {
      src: path.join(__dirname, '../resources/control-value-accessors/', rf),
      dest: path.join(directory, rf),
      keepDirStructure: false,
      warn: false,
    };
  });
  return config.sys.copy(copyTasks, path.join(directory));
}

const VALUE_ACCESSOR_SELECTORS = `<VALUE_ACCESSOR_SELECTORS>`;
const VALUE_ACCESSOR_EVENT = `<VALUE_ACCESSOR_EVENT>`;
const VALUE_ACCESSOR_TARGETATTR = '<VALUE_ACCESSOR_TARGETATTR>';
const VALUE_ACCESSOR_EVENTTARGETS = `    '(<VALUE_ACCESSOR_EVENT>)': 'handleChangeEvent($event.target.<VALUE_ACCESSOR_TARGETATTR>)'`;
