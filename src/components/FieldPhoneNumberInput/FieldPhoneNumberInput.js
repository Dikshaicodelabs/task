/**
 * A text field with phone number formatting. By default uses formatting
 * rules defined in the fiFormatter.js file. To change the formatting
 * provide alternative implementations for the format and parse functions
 * that are passed to the input field.
 */
import React from 'react';

import { FieldTextInput } from '../../components';
// This formatter formats phone numbers that start with leading '+' sign,
// but for other inputs it just strips space characters off.
import { format, parse } from './e164Formatter';

const FieldPhoneNumberInput = props => {
  const inputProps = {
    type: 'text',
    format: format,
    parse: parse,
    ...props,
  };

  return <FieldTextInput {...inputProps} />;
};

export default FieldPhoneNumberInput;
