interface AngularModelConfig {
  elementSelectors: string | string[];
  event: string;
  targetAttr: string;
  type: 'text' | 'radio' | 'select' | 'number' | 'boolean';
}

const EVENTS = {
  'Select': 'ionSelect',
  'Change': 'ionChange'
};

const ATTRS = {
  'Checked': 'checked',
  'Value': 'value'
};

const config: AngularModelConfig[] = [
  {
    elementSelectors: [ 'ion-checkbox', 'ion-toggle' ],
    event: EVENTS.Change,
    targetAttr: ATTRS.Checked,
    type: 'boolean'
  },
  {
    elementSelectors: [ 'ion-input[type=number]' ],
    event: EVENTS.Change,
    targetAttr: ATTRS.Value,
    type: 'number'
  },
  {
    elementSelectors: [ 'ion-radio' ],
    event: EVENTS.Select,
    targetAttr: ATTRS.Checked,
    type: 'radio'
  },
  {
    elementSelectors: [ 'ion-range', 'ion-select', 'ion-radio-group', 'ion-segment', 'ion-datetime' ],
    event: EVENTS.Change,
    targetAttr: ATTRS.Value,
    type: 'select'
  },
  {
    elementSelectors: ['ion-input:not([type=number])', 'ion-textarea', 'ion-searchbar'],
    event: EVENTS.Change,
    targetAttr: ATTRS.Value,
    type: 'text'
  },
];

