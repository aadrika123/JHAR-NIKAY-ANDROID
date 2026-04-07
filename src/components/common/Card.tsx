import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../lib/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 'md',
  shadow = 'md',
}) => {
  const getPaddingStyle = () => {
    switch (padding) {
      case 'sm':
        return { padding: SPACING.md };
      case 'lg':
        return { padding: SPACING.xxl };
      default:
        return { padding: SPACING.lg };
    }
  };

  const getShadowStyle = () => {
    switch (shadow) {
      case 'sm':
        return SHADOWS.sm;
      case 'lg':
        return SHADOWS.lg;
      case 'none':
        return {};
      default:
        return SHADOWS.md;
    }
  };

  return (
    <View style={[styles.card, getPaddingStyle(), getShadowStyle(), style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
});

export default Card;
