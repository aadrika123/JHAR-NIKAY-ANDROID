import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// ─── Theme ────────────────────────────────────────────────────────────────────
const COLORS = {
  white: '#FFFFFF',
  gray100: '#F3F4F6',
  gray400: '#9CA3AF',
  accent: '#EC4899',
  accentLight: '#FCE7F3',
};

// ─── Icon map — swap emoji for your icon library ──────────────────────────────
const ICONS: Record<string, string> = {
  Home: '🏠',
  Profile: '👤',
  Settings: '⚙️',
};

// ─── Single tab item ──────────────────────────────────────────────────────────
function TabItem({
  route,
  isFocused,
  label,
  onPress,
  onLongPress,
}: {
  route: any;
  isFocused: boolean;
  label: string;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const bgOpacity = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(bgOpacity, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: true,
      tension: 180,
      friction: 14,
    }).start();
  }, [isFocused, bgOpacity]);

  const pressIn = () =>
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
      tension: 260,
      friction: 12,
    }).start();

  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 180,
      friction: 10,
    }).start();

  const icon = ICONS[route.name] ?? '●';

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={styles.tabItem}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
    >
      <Animated.View style={[styles.tabInner, { transform: [{ scale }] }]}>
        {/* Pill background */}
        <Animated.View
          pointerEvents="none"
          style={[styles.pillBg, { opacity: bgOpacity }]}
        />

        {/* Icon */}
        <Text
          style={[
            styles.icon,
            { color: isFocused ? COLORS.accent : COLORS.gray400 },
          ]}
        >
          {icon}
        </Text>

        {/* Label */}
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            { color: isFocused ? COLORS.accent : COLORS.gray400 },
            isFocused && styles.labelActive,
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// ─── Tab Bar ──────────────────────────────────────────────────────────────────
export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const rawLabel =
          options.tabBarLabel !== undefined
            ? typeof options.tabBarLabel === 'function'
              ? options.tabBarLabel({
                  focused: isFocused,
                  color: isFocused ? COLORS.accent : COLORS.gray400,
                  position: 'below-icon',
                  children: route.name,
                })
              : options.tabBarLabel
            : options.title ?? route.name;

        const label = typeof rawLabel === 'string' ? rawLabel : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented)
            navigation.navigate(route.name, route.params);
        };

        const onLongPress = () =>
          navigation.emit({ type: 'tabLongPress', target: route.key });

        return (
          <TabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            label={label}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.gray100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
  },

  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabInner: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 18,
    position: 'relative',
    minWidth: 64,
  },

  pillBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.accentLight,
    borderRadius: 18,
  },

  icon: {
    fontSize: 18,
    lineHeight: 22,
  },

  label: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 3,
    letterSpacing: 0.2,
  },

  labelActive: {
    fontWeight: '700',
  },
});
