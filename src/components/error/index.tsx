import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobeLock, RefreshCw } from 'lucide-react-native';

// error screen ?
type Props = {
  navigation: any;
};

const Error = ({ navigation }: Props) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <GlobeLock size={100} color={theme.colors.notification} />
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>
        Something went wrong
      </Text>
      <TouchableOpacity
        style={{ marginTop: 16 }}
        onPress={() => navigation.replace('Home')}
      >
        <RefreshCw size={30} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
};

export default Error;
