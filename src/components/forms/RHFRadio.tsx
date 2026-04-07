// form
import { useFormContext, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { RadioButton, HelperText, Text } from 'react-native-paper';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  options: { label: string; value: any }[];
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  color?: string;
};

export default function RHFTextField({
  name,
  options,
  direction,
  color,
}: Readonly<Props>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <View>
          <RadioButton.Group onValueChange={field.onChange} value={field.value}>
            <View style={{ flexDirection: direction }}>
              {options.map((e, i) => {
                return (
                  <View
                    key={i}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <RadioButton
                      value={
                        typeof field.value === 'number' && e.value === 0
                          ? ''
                          : e.value
                      }
                      color={color}
                    />
                    <Text>{e.label}</Text>
                  </View>
                );
              })}
            </View>
          </RadioButton.Group>
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}
