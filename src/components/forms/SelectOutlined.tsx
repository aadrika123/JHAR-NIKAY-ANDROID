// form
import { useFormContext, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { SelectList, SelectListProps } from 'react-native-dropdown-select-list';
import { Globe, Search } from 'lucide-react-native';

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
          <Globe
            color="#374151"
            size={25}
            style={{
              position: 'absolute',
              left: 5,
              top: 10,
              zIndex: 100,
            }}
          />
          <SelectList
            searchPlaceholder="Select a country"
            searchicon={<Search size={20} color="#374151" />}
            data={data}
            save="value"
            boxStyles={{
              height: 45,
              paddingLeft: 40,
              alignItems: 'center',
              backgroundColor: 'transparent',
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
              marginTop: 0,
              borderTopStartRadius: 0,
              borderTopEndRadius: 0,
              borderTopWidth: 0,
              backgroundColor: '#fff',
              borderColor: '#9ca3af',
              borderWidth: 1,
              borderBottomEndRadius: 8,
              borderBottomStartRadius: 8,
              // borderBottomWidth: 1,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              // borderBottomColor: '#9ca3af',
              borderLeftColor: '#9ca3af',
              borderRightColor: '#9ca3af',
              width: '100%',

              overflow: 'hidden',
            }}
            dropdownItemStyles={{
              backgroundColor: '#fff',
              borderBottomColor: '#9ca3af',
              // last item border bottom width using data.length
              marginVertical: 4,
            }}
            {...other}
          />
          {error && <HelperText type="error">{error.message}</HelperText>}
        </View>
      )}
    />
  );
}
