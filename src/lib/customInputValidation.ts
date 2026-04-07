export type InputValidationType = Array<
  | 'mobile'
  | 'string'
  | 'number'
  | 'email'
  | 'phone'
  | 'zip'
  | 'aadhar'
  | 'address'
  | 'removeDoubleSpace'
  | 'removeSpecialCharacterExceptSpaceAndDot'
  | 'removeSpecialCharacterExceptSpace'
  | 'sqlInjectionGuard'
  | 'removeSpecialCharacter'
  | 'removeDoubleQuote'
  | 'removeSingleQuote'
  | 'removeSpecialCharacterWithDoubleSpace'
  | 'CapitalFirstLetter'
  | 'UppercaseAfterSpace'
  | 'Uppercase'
  | 'Lowercase'
  | 'removeSpace'
  | 'none'
>;

export const customInputValidation = (
  text: string,
  inputValidation: InputValidationType,
): string => {
  let validatedText = text;

  if (inputValidation.includes('mobile')) {
    if (validatedText.length > 10) {
      validatedText = validatedText.slice(0, 10);
    }
  }

  if (inputValidation.includes('zip')) {
    if (validatedText.length > 6) {
      validatedText = validatedText.slice(0, 6);
    }
  }

  if (inputValidation.includes('aadhar')) {
    if (validatedText.length > 12) {
      validatedText = validatedText.slice(0, 12);
    }
  }

  if (inputValidation.includes('removeDoubleSpace')) {
    validatedText = validatedText.replace(/\s+/g, ' ');
  }

  if (inputValidation.includes('removeSpecialCharacter')) {
    validatedText = validatedText.replace(/[^a-zA-Z0-9]/g, '');
  }

  if (inputValidation.includes('removeSpecialCharacterExceptSpace')) {
    validatedText = validatedText.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  if (inputValidation.includes('removeSpecialCharacterExceptSpaceAndDot')) {
    validatedText = validatedText.replace(/[^a-zA-Z0-9 .]/g, '');
  }

  if (inputValidation.includes('sqlInjectionGuard')) {
    if (
      validatedText.toLowerCase().includes('drop') ||
      validatedText.toLowerCase().includes('select')
    ) {
      validatedText = '';
    }
  }

  if (inputValidation.includes('address')) {
    validatedText = validatedText.replace(/[^a-zA-Z0-9 ,]/g, '');
  }

  if (inputValidation.includes('phone')) {
    validatedText = validatedText.replace(/[^0-9]/g, '');
  }

  if (inputValidation.includes('email')) {
    validatedText = validatedText.replace(/[^a-zA-Z0-9@.]/g, '');
  }

  if (inputValidation.includes('string')) {
    validatedText = validatedText.replace(/[^a-zA-Z ]/g, '');
  }

  if (inputValidation.includes('number')) {
    validatedText = validatedText.replace(/[^0-9]/g, '');
  }

  if (inputValidation.includes('removeDoubleQuote')) {
    validatedText = validatedText.replace(/"/g, '');
  }

  if (inputValidation.includes('removeSingleQuote')) {
    validatedText = validatedText.replace(/'/g, '');
  }

  if (inputValidation.includes('removeSpecialCharacterWithDoubleSpace')) {
    validatedText = validatedText.replace(/[^a-zA-Z0-9 ]/g, '');
    validatedText = validatedText.replace(/\s+/g, ' ');
  }

  if (inputValidation.includes('CapitalFirstLetter')) {
    validatedText =
      validatedText.charAt(0).toUpperCase() + validatedText.slice(1);
  }

  if (inputValidation.includes('UppercaseAfterSpace')) {
    validatedText = validatedText
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  if (inputValidation.includes('Uppercase')) {
    validatedText = validatedText.toUpperCase();
  }

  if (inputValidation.includes('removeSpace')) {
    validatedText = validatedText.replace(/\s+/g, '');
  }

  if (inputValidation.includes('Lowercase')) {
    validatedText = validatedText.toLowerCase();
  }

  if (inputValidation.includes('none')) {
    // Return text as-is
  }

  return validatedText;
};

// Usage example with React Native TextInput:
/*
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const ExampleComponent = () => {
  const [inputValue, setInputValue] = useState('');

  const handleTextChange = (text: string) => {
    const validatedText = customInputValidation(text, ['mobile', 'removeDoubleSpace']);
    setInputValue(validatedText);
  };

  return (
    <View>
      <TextInput
        value={inputValue}
        onChangeText={handleTextChange}
        placeholder="Enter mobile number"
        keyboardType="numeric"
      />
    </View>
  );
};
*/
