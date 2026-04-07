// form
import { useFormContext, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

// ----------------------------------------------------------------------

type Props = TextInputProps & {
  name: string;
  label?: string;
};

export default function RHFTextField({ name, label, ...other }: Props) {
  const { control } = useFormContext();
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <View>
          <TextInput
            ref={ref}
            label={label}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            mode="flat"
            value={
              typeof field.value === 'number' && field.value === 0
                ? ''
                : field.value
            }
            error={Boolean(error)}
            style={{
              width: '100%',
              backgroundColor: theme.colors.border,
              height: other.multiline === true ? undefined : 60,
              borderRadius: 20,
              paddingHorizontal: 20,
              fontSize: 16,
              borderTopEndRadius: 12,
              borderTopStartRadius: 12,
              borderBottomEndRadius: 12,
              borderBottomStartRadius: 12,
            }}
            underlineStyle={{ display: 'none' }}
            textColor={theme.colors.text}
            placeholderTextColor="gray"
            {...other}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}
