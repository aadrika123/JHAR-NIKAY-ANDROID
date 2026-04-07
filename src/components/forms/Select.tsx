// form
import { useFormContext, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { SelectList, SelectListProps } from 'react-native-dropdown-select-list';

// ----------------------------------------------------------------------

interface Props extends SelectListProps {
  name: string;
  data: { key: string; value: string }[];
}

export default function RHFTextField({
  name,
  data,
  ...other
}: Readonly<Props>) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({
        field: { ref, ...field },
        fieldState: { error, isTouched },
      }) => (
        <View>
          <SelectList
            data={data}
            save="value"
            boxStyles={{
              height: 56,
              alignItems: 'center',
              backgroundColor: '#e5e7eb',
              borderColor: error ? '#b91c1c' : '#9ca3af',
              borderBottomWidth: error ? 1.5 : 1,
              borderTopWidth: 0,
              borderBottomEndRadius: 0,
              borderBottomStartRadius: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderTopEndRadius: 8,
              borderTopStartRadius: 8,
            }}
            inputStyles={{ color: error && '#b91c1c' }}
            dropdownStyles={{
              zIndex: 100,

              width: '100%',
              backgroundColor: '#e5e7eb',
              marginTop: 0,
              borderTopStartRadius: 0,
              borderTopEndRadius: 0,
              borderTopWidth: 0,
            }}
            {...other}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}
