import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ILoadingButton extends TouchableOpacityProps {
  isLoading: boolean;
  children: React.ReactNode;
  bgColor?: string;
}

export default function RNLoadingButton({
  children,
  isLoading,
  bgColor,
  ...props
}: ILoadingButton) {
  return (
    <TouchableOpacity
      style={styles.loginButton}
      activeOpacity={0.8}
      disabled={isLoading}
      {...props}
    >
      <LinearGradient
        colors={['#FF1744', '#FF6B9D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.loginButtonText}>{children}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
