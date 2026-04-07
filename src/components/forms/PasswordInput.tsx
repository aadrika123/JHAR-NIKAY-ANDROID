import { useFormContext, Controller } from 'react-hook-form';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
  label?: string;
  placeHolder?: string;
  Icon?: any;
};

export default function RHFPasswordTextField({
  name,
  label,
  placeHolder,
  Icon,
  ...other
}: Props) {
  const { control } = useFormContext();
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <View style={styles.wrapper}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View style={styles.inputContainer}>
            <View style={styles.iconWrapper}>
              <Lock size={20} color="#FF6B9D" />
            </View>
            <TextInput
              style={styles.input}
              placeholder={placeHolder ?? label}
              placeholderTextColor="#999"
              autoCapitalize="none"
              ref={ref}
              onChangeText={field.onChange}
              autoComplete="off"
              textContentType="oneTimeCode" // Use oneTimeCode instead of none for secure fields
              secureTextEntry={!showPassword}
              onBlur={field.onBlur}
              value={
                typeof field.value === 'number' && field.value === 0
                  ? ''
                  : field.value
              }
              {...other}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye size={20} color="#999" />
              ) : (
                <EyeOff size={20} color="#999" />
              )}
            </TouchableOpacity>
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  inputContainerError: {
    borderColor: '#FF6B9D',
    borderWidth: 1.5,
  },
  iconWrapper: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    fontSize: 12,
    color: '#FF6B9D',
    marginTop: 5,
    marginLeft: 5,
  },
  eyeIcon: {
    padding: 5,
  },
});
