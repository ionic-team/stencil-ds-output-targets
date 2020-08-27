/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import { Components, JSX } from 'component-library';


interface MyInputProps {
  
  /** The color to use from your application's color palette.
Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
For more information on colors, see [theming](/docs/theming/basics). */
  color?: Components.MyInput["color"]
  
  /** If the value of the type attribute is `"file"`, then this attribute will indicate the types of files that the server accepts, otherwise it will be ignored. The value must be a comma-separated list of unique content type specifiers. */
  accept?: Components.MyInput["accept"]
  
  /** Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user. */
  autocapitalize?: Components.MyInput["autocapitalize"]
  
  /** Indicates whether the value of the control can be automatically completed by the browser. */
  autocomplete?: Components.MyInput["autocomplete"]
  
  /** Whether auto correction should be enabled when the user is entering/editing the text value. */
  autocorrect?: Components.MyInput["autocorrect"]
  
  /** This Boolean attribute lets you specify that a form control should have input focus when the page loads. */
  autofocus?: Components.MyInput["autofocus"]
  
  /** If `true`, a clear icon will appear in the input when there is a value. Clicking it clears the input. */
  clearInput?: Components.MyInput["clearInput"]
  
  /** If `true`, the value will be cleared after focus upon edit. Defaults to `true` when `type` is `"password"`, `false` for all other types. */
  clearOnEdit?: Components.MyInput["clearOnEdit"]
  
  /** If `true`, the user cannot interact with the input. */
  disabled?: Components.MyInput["disabled"]
  
  /** A hint to the browser for which enter key to display.
Possible values: `"enter"`, `"done"`, `"go"`, `"next"`,
`"previous"`, `"search"`, and `"send"`. */
  enterkeyhint?: Components.MyInput["enterkeyhint"]
  
  /** A hint to the browser for which keyboard to display.
Possible values: `"none"`, `"text"`, `"tel"`, `"url"`,
`"email"`, `"numeric"`, `"decimal"`, and `"search"`. */
  inputmode?: Components.MyInput["inputmode"]
  
  /** The maximum value, which must not be less than its minimum (min attribute) value. */
  max?: Components.MyInput["max"]
  
  /** If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter. */
  maxlength?: Components.MyInput["maxlength"]
  
  /** The minimum value, which must not be greater than its maximum (max attribute) value. */
  min?: Components.MyInput["min"]
  
  /** If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter. */
  minlength?: Components.MyInput["minlength"]
  
  /** If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `"email"` or `"file"`, otherwise it is ignored. */
  multiple?: Components.MyInput["multiple"]
  
  /** The name of the control, which is submitted with the form data. */
  name?: Components.MyInput["name"]
  
  /** A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, `"date"`, or `"password"`, otherwise it is ignored. When the type attribute is `"date"`, `pattern` will only be used in browsers that do not support the `"date"` input type natively. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date for more information. */
  pattern?: Components.MyInput["pattern"]
  
  /** Instructional text that shows before the input has a value. */
  placeholder?: Components.MyInput["placeholder"]
  
  /** If `true`, the user cannot modify the value. */
  readonly?: Components.MyInput["readonly"]
  
  /** If `true`, the user must fill in a value before submitting a form. */
  required?: Components.MyInput["required"]
  
  /** If `true`, the element will have its spelling and grammar checked. */
  spellcheck?: Components.MyInput["spellcheck"]
  
  /** Works with the min and max attributes to limit the increments at which a value can be set.
Possible values are: `"any"` or a positive floating point number. */
  step?: Components.MyInput["step"]
  
  /** The initial size of the control. This value is in pixels unless the value of the type attribute is `"text"` or `"password"`, in which case it is an integer number of characters. This attribute applies only when the `type` attribute is set to `"text"`, `"search"`, `"tel"`, `"url"`, `"email"`, or `"password"`, otherwise it is ignored. */
  size?: Components.MyInput["size"]
  
  /** The type of control to display. The default type is text. */
  type?: Components.MyInput["type"]
  
  /** The value of the input. */
  value?: Components.MyInput["value"]
}

interface MyInputEvents {
  
  /** Emitted when a keyboard input occurred. */
  myInput: Parameters<JSX.MyInput["onMyInput"]>[0]
  
  /** Emitted when the value has changed. */
  myChange: Parameters<JSX.MyInput["onMyChange"]>[0]
  
  /** Emitted when the input loses focus. */
  myBlur: Parameters<JSX.MyInput["onMyBlur"]>[0]
  
  /** Emitted when the input has focus. */
  myFocus: Parameters<JSX.MyInput["onMyFocus"]>[0]
}

interface MyInputSlots {
  default: any
}
  
/* generated by Svelte v3.24.1 */
import {
	SvelteComponent,
	binding_callbacks,
	create_slot,
	detach,
	element,
	flush,
	init,
	insert,
	listen,
	run_all,
	safe_not_equal,
	set_custom_element_data,
	transition_in,
	transition_out,
	update_slot
} from "svelte/internal";

import { createEventDispatcher, onMount } from "svelte";

function create_fragment(ctx) {
	let my_input;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*$$slots*/ ctx[32].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[31], null);

	return {
		c() {
			my_input = element("my-input");
			if (default_slot) default_slot.c();
			set_custom_element_data(my_input, "color", /*color*/ ctx[1]);
			set_custom_element_data(my_input, "accept", /*accept*/ ctx[2]);
			set_custom_element_data(my_input, "autocapitalize", /*autocapitalize*/ ctx[3]);
			set_custom_element_data(my_input, "autocomplete", /*autocomplete*/ ctx[4]);
			set_custom_element_data(my_input, "autocorrect", /*autocorrect*/ ctx[5]);
			set_custom_element_data(my_input, "autofocus", /*autofocus*/ ctx[6]);
			set_custom_element_data(my_input, "clear-input", /*clearInput*/ ctx[7]);
			set_custom_element_data(my_input, "clear-on-edit", /*clearOnEdit*/ ctx[8]);
			set_custom_element_data(my_input, "disabled", /*disabled*/ ctx[9]);
			set_custom_element_data(my_input, "enterkeyhint", /*enterkeyhint*/ ctx[10]);
			set_custom_element_data(my_input, "inputmode", /*inputmode*/ ctx[11]);
			set_custom_element_data(my_input, "max", /*max*/ ctx[12]);
			set_custom_element_data(my_input, "maxlength", /*maxlength*/ ctx[13]);
			set_custom_element_data(my_input, "min", /*min*/ ctx[14]);
			set_custom_element_data(my_input, "minlength", /*minlength*/ ctx[15]);
			set_custom_element_data(my_input, "multiple", /*multiple*/ ctx[16]);
			set_custom_element_data(my_input, "name", /*name*/ ctx[17]);
			set_custom_element_data(my_input, "pattern", /*pattern*/ ctx[18]);
			set_custom_element_data(my_input, "placeholder", /*placeholder*/ ctx[19]);
			set_custom_element_data(my_input, "readonly", /*readonly*/ ctx[20]);
			set_custom_element_data(my_input, "required", /*required*/ ctx[21]);
			set_custom_element_data(my_input, "spellcheck", /*spellcheck*/ ctx[22]);
			set_custom_element_data(my_input, "step", /*step*/ ctx[23]);
			set_custom_element_data(my_input, "size", /*size*/ ctx[24]);
			set_custom_element_data(my_input, "type", /*type*/ ctx[25]);
			set_custom_element_data(my_input, "value", /*value*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, my_input, anchor);

			if (default_slot) {
				default_slot.m(my_input, null);
			}

			/*my_input_binding*/ ctx[33](my_input);
			current = true;

			if (!mounted) {
				dispose = [
					listen(my_input, "myInput", /*onEvent*/ ctx[27]),
					listen(my_input, "myChange", /*onEvent*/ ctx[27]),
					listen(my_input, "myBlur", /*onEvent*/ ctx[27]),
					listen(my_input, "myFocus", /*onEvent*/ ctx[27])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty[1] & /*$$scope*/ 1) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[31], dirty, null, null);
				}
			}

			if (!current || dirty[0] & /*color*/ 2) {
				set_custom_element_data(my_input, "color", /*color*/ ctx[1]);
			}

			if (!current || dirty[0] & /*accept*/ 4) {
				set_custom_element_data(my_input, "accept", /*accept*/ ctx[2]);
			}

			if (!current || dirty[0] & /*autocapitalize*/ 8) {
				set_custom_element_data(my_input, "autocapitalize", /*autocapitalize*/ ctx[3]);
			}

			if (!current || dirty[0] & /*autocomplete*/ 16) {
				set_custom_element_data(my_input, "autocomplete", /*autocomplete*/ ctx[4]);
			}

			if (!current || dirty[0] & /*autocorrect*/ 32) {
				set_custom_element_data(my_input, "autocorrect", /*autocorrect*/ ctx[5]);
			}

			if (!current || dirty[0] & /*autofocus*/ 64) {
				set_custom_element_data(my_input, "autofocus", /*autofocus*/ ctx[6]);
			}

			if (!current || dirty[0] & /*clearInput*/ 128) {
				set_custom_element_data(my_input, "clear-input", /*clearInput*/ ctx[7]);
			}

			if (!current || dirty[0] & /*clearOnEdit*/ 256) {
				set_custom_element_data(my_input, "clear-on-edit", /*clearOnEdit*/ ctx[8]);
			}

			if (!current || dirty[0] & /*disabled*/ 512) {
				set_custom_element_data(my_input, "disabled", /*disabled*/ ctx[9]);
			}

			if (!current || dirty[0] & /*enterkeyhint*/ 1024) {
				set_custom_element_data(my_input, "enterkeyhint", /*enterkeyhint*/ ctx[10]);
			}

			if (!current || dirty[0] & /*inputmode*/ 2048) {
				set_custom_element_data(my_input, "inputmode", /*inputmode*/ ctx[11]);
			}

			if (!current || dirty[0] & /*max*/ 4096) {
				set_custom_element_data(my_input, "max", /*max*/ ctx[12]);
			}

			if (!current || dirty[0] & /*maxlength*/ 8192) {
				set_custom_element_data(my_input, "maxlength", /*maxlength*/ ctx[13]);
			}

			if (!current || dirty[0] & /*min*/ 16384) {
				set_custom_element_data(my_input, "min", /*min*/ ctx[14]);
			}

			if (!current || dirty[0] & /*minlength*/ 32768) {
				set_custom_element_data(my_input, "minlength", /*minlength*/ ctx[15]);
			}

			if (!current || dirty[0] & /*multiple*/ 65536) {
				set_custom_element_data(my_input, "multiple", /*multiple*/ ctx[16]);
			}

			if (!current || dirty[0] & /*name*/ 131072) {
				set_custom_element_data(my_input, "name", /*name*/ ctx[17]);
			}

			if (!current || dirty[0] & /*pattern*/ 262144) {
				set_custom_element_data(my_input, "pattern", /*pattern*/ ctx[18]);
			}

			if (!current || dirty[0] & /*placeholder*/ 524288) {
				set_custom_element_data(my_input, "placeholder", /*placeholder*/ ctx[19]);
			}

			if (!current || dirty[0] & /*readonly*/ 1048576) {
				set_custom_element_data(my_input, "readonly", /*readonly*/ ctx[20]);
			}

			if (!current || dirty[0] & /*required*/ 2097152) {
				set_custom_element_data(my_input, "required", /*required*/ ctx[21]);
			}

			if (!current || dirty[0] & /*spellcheck*/ 4194304) {
				set_custom_element_data(my_input, "spellcheck", /*spellcheck*/ ctx[22]);
			}

			if (!current || dirty[0] & /*step*/ 8388608) {
				set_custom_element_data(my_input, "step", /*step*/ ctx[23]);
			}

			if (!current || dirty[0] & /*size*/ 16777216) {
				set_custom_element_data(my_input, "size", /*size*/ ctx[24]);
			}

			if (!current || dirty[0] & /*type*/ 33554432) {
				set_custom_element_data(my_input, "type", /*type*/ ctx[25]);
			}

			if (!current || dirty[0] & /*value*/ 1) {
				set_custom_element_data(my_input, "value", /*value*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(my_input);
			if (default_slot) default_slot.d(detaching);
			/*my_input_binding*/ ctx[33](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let __ref;
	let __mounted = false;
	const dispatch = createEventDispatcher();
	let { color = undefined } = $$props;
	let { accept = undefined } = $$props;
	let { autocapitalize = undefined } = $$props;
	let { autocomplete = undefined } = $$props;
	let { autocorrect = undefined } = $$props;
	let { autofocus = undefined } = $$props;
	let { clearInput = undefined } = $$props;
	let { clearOnEdit = undefined } = $$props;
	let { disabled = undefined } = $$props;
	let { enterkeyhint = undefined } = $$props;
	let { inputmode = undefined } = $$props;
	let { max = undefined } = $$props;
	let { maxlength = undefined } = $$props;
	let { min = undefined } = $$props;
	let { minlength = undefined } = $$props;
	let { multiple = undefined } = $$props;
	let { name = undefined } = $$props;
	let { pattern = undefined } = $$props;
	let { placeholder = undefined } = $$props;
	let { readonly = undefined } = $$props;
	let { required = undefined } = $$props;
	let { spellcheck = undefined } = $$props;
	let { step = undefined } = $$props;
	let { size = undefined } = $$props;
	let { type = undefined } = $$props;
	let { value = undefined } = $$props;
	const setFocus = (...args) => __ref.setFocus(...args);
	const getInputElement = (...args) => __ref.getInputElement(...args);
	const getWebComponent = () => __ref;

	onMount(() => {
		__mounted = true;
	});

	const setProp = (prop, value) => {
		if (__ref) $$invalidate(26, __ref[prop] = value, __ref);
	};

	const onEvent = e => {
		e.stopPropagation();
		dispatch(e.type, e.detail);

		if (e.type === "myChange") {
			$$invalidate(0, value = e.detail);
		}
	};

	let { $$slots = {}, $$scope } = $$props;

	function my_input_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			__ref = $$value;
			$$invalidate(26, __ref);
		});
	}

	$$self.$$set = $$props => {
		if ("color" in $$props) $$invalidate(1, color = $$props.color);
		if ("accept" in $$props) $$invalidate(2, accept = $$props.accept);
		if ("autocapitalize" in $$props) $$invalidate(3, autocapitalize = $$props.autocapitalize);
		if ("autocomplete" in $$props) $$invalidate(4, autocomplete = $$props.autocomplete);
		if ("autocorrect" in $$props) $$invalidate(5, autocorrect = $$props.autocorrect);
		if ("autofocus" in $$props) $$invalidate(6, autofocus = $$props.autofocus);
		if ("clearInput" in $$props) $$invalidate(7, clearInput = $$props.clearInput);
		if ("clearOnEdit" in $$props) $$invalidate(8, clearOnEdit = $$props.clearOnEdit);
		if ("disabled" in $$props) $$invalidate(9, disabled = $$props.disabled);
		if ("enterkeyhint" in $$props) $$invalidate(10, enterkeyhint = $$props.enterkeyhint);
		if ("inputmode" in $$props) $$invalidate(11, inputmode = $$props.inputmode);
		if ("max" in $$props) $$invalidate(12, max = $$props.max);
		if ("maxlength" in $$props) $$invalidate(13, maxlength = $$props.maxlength);
		if ("min" in $$props) $$invalidate(14, min = $$props.min);
		if ("minlength" in $$props) $$invalidate(15, minlength = $$props.minlength);
		if ("multiple" in $$props) $$invalidate(16, multiple = $$props.multiple);
		if ("name" in $$props) $$invalidate(17, name = $$props.name);
		if ("pattern" in $$props) $$invalidate(18, pattern = $$props.pattern);
		if ("placeholder" in $$props) $$invalidate(19, placeholder = $$props.placeholder);
		if ("readonly" in $$props) $$invalidate(20, readonly = $$props.readonly);
		if ("required" in $$props) $$invalidate(21, required = $$props.required);
		if ("spellcheck" in $$props) $$invalidate(22, spellcheck = $$props.spellcheck);
		if ("step" in $$props) $$invalidate(23, step = $$props.step);
		if ("size" in $$props) $$invalidate(24, size = $$props.size);
		if ("type" in $$props) $$invalidate(25, type = $$props.type);
		if ("value" in $$props) $$invalidate(0, value = $$props.value);
		if ("$$scope" in $$props) $$invalidate(31, $$scope = $$props.$$scope);
	};

	return [
		value,
		color,
		accept,
		autocapitalize,
		autocomplete,
		autocorrect,
		autofocus,
		clearInput,
		clearOnEdit,
		disabled,
		enterkeyhint,
		inputmode,
		max,
		maxlength,
		min,
		minlength,
		multiple,
		name,
		pattern,
		placeholder,
		readonly,
		required,
		spellcheck,
		step,
		size,
		type,
		__ref,
		onEvent,
		setFocus,
		getInputElement,
		getWebComponent,
		$$scope,
		$$slots,
		my_input_binding
	];
}

class MyInput extends SvelteComponent {
  $$prop_def: MyInputProps;
  $$events_def: MyInputEvents;
  $$slot_def: MyInputSlots;

  $on<K extends keyof MyInputEvents>(type: K, callback: (e: MyInputEvents[K]) => any): () => void {
	  return super.$on(type, callback);
	}

  $set($$props: Partial<MyInputProps>): void {
	  super.$set($$props);
	}

	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				color: 1,
				accept: 2,
				autocapitalize: 3,
				autocomplete: 4,
				autocorrect: 5,
				autofocus: 6,
				clearInput: 7,
				clearOnEdit: 8,
				disabled: 9,
				enterkeyhint: 10,
				inputmode: 11,
				max: 12,
				maxlength: 13,
				min: 14,
				minlength: 15,
				multiple: 16,
				name: 17,
				pattern: 18,
				placeholder: 19,
				readonly: 20,
				required: 21,
				spellcheck: 22,
				step: 23,
				size: 24,
				type: 25,
				value: 0,
				setFocus: 28,
				getInputElement: 29,
				getWebComponent: 30
			},
			[-1, -1]
		);
	}

	get color() {
		return this.$$.ctx[1];
	}

	set color(color) {
		this.$set({ color });
		flush();
	}

	get accept() {
		return this.$$.ctx[2];
	}

	set accept(accept) {
		this.$set({ accept });
		flush();
	}

	get autocapitalize() {
		return this.$$.ctx[3];
	}

	set autocapitalize(autocapitalize) {
		this.$set({ autocapitalize });
		flush();
	}

	get autocomplete() {
		return this.$$.ctx[4];
	}

	set autocomplete(autocomplete) {
		this.$set({ autocomplete });
		flush();
	}

	get autocorrect() {
		return this.$$.ctx[5];
	}

	set autocorrect(autocorrect) {
		this.$set({ autocorrect });
		flush();
	}

	get autofocus() {
		return this.$$.ctx[6];
	}

	set autofocus(autofocus) {
		this.$set({ autofocus });
		flush();
	}

	get clearInput() {
		return this.$$.ctx[7];
	}

	set clearInput(clearInput) {
		this.$set({ clearInput });
		flush();
	}

	get clearOnEdit() {
		return this.$$.ctx[8];
	}

	set clearOnEdit(clearOnEdit) {
		this.$set({ clearOnEdit });
		flush();
	}

	get disabled() {
		return this.$$.ctx[9];
	}

	set disabled(disabled) {
		this.$set({ disabled });
		flush();
	}

	get enterkeyhint() {
		return this.$$.ctx[10];
	}

	set enterkeyhint(enterkeyhint) {
		this.$set({ enterkeyhint });
		flush();
	}

	get inputmode() {
		return this.$$.ctx[11];
	}

	set inputmode(inputmode) {
		this.$set({ inputmode });
		flush();
	}

	get max() {
		return this.$$.ctx[12];
	}

	set max(max) {
		this.$set({ max });
		flush();
	}

	get maxlength() {
		return this.$$.ctx[13];
	}

	set maxlength(maxlength) {
		this.$set({ maxlength });
		flush();
	}

	get min() {
		return this.$$.ctx[14];
	}

	set min(min) {
		this.$set({ min });
		flush();
	}

	get minlength() {
		return this.$$.ctx[15];
	}

	set minlength(minlength) {
		this.$set({ minlength });
		flush();
	}

	get multiple() {
		return this.$$.ctx[16];
	}

	set multiple(multiple) {
		this.$set({ multiple });
		flush();
	}

	get name() {
		return this.$$.ctx[17];
	}

	set name(name) {
		this.$set({ name });
		flush();
	}

	get pattern() {
		return this.$$.ctx[18];
	}

	set pattern(pattern) {
		this.$set({ pattern });
		flush();
	}

	get placeholder() {
		return this.$$.ctx[19];
	}

	set placeholder(placeholder) {
		this.$set({ placeholder });
		flush();
	}

	get readonly() {
		return this.$$.ctx[20];
	}

	set readonly(readonly) {
		this.$set({ readonly });
		flush();
	}

	get required() {
		return this.$$.ctx[21];
	}

	set required(required) {
		this.$set({ required });
		flush();
	}

	get spellcheck() {
		return this.$$.ctx[22];
	}

	set spellcheck(spellcheck) {
		this.$set({ spellcheck });
		flush();
	}

	get step() {
		return this.$$.ctx[23];
	}

	set step(step) {
		this.$set({ step });
		flush();
	}

	get size() {
		return this.$$.ctx[24];
	}

	set size(size) {
		this.$set({ size });
		flush();
	}

	get type() {
		return this.$$.ctx[25];
	}

	set type(type) {
		this.$set({ type });
		flush();
	}

	get value() {
		return this.$$.ctx[0];
	}

	set value(value) {
		this.$set({ value });
		flush();
	}

	
  /** Sets focus on the specified `my-input`. Use this method instead of the global
`input.focus()`. */
 get setFocus(): Components.MyInput["setFocus"] {
		return this.$$.ctx[28];
	}

	
  /** Returns the native `<input>` element used under the hood. */
 get getInputElement(): Components.MyInput["getInputElement"] {
		return this.$$.ctx[29];
	}

	get getWebComponent(): HTMLMyInputElement | undefined {
		return this.$$.ctx[30];
	}
}

export default MyInput;