import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Easing,
  Text,
  Modal,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// ─── 1. PULSE RING LOADER ──────────────────────────────────────────────────────
export const PulseRingLoader: React.FC<{ color?: string; size?: number }> = ({
  color = '#EC4899',
  size = 60,
}) => {
  const ring1 = useRef(new Animated.Value(0)).current;
  const ring2 = useRef(new Animated.Value(0)).current;
  const ring3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createPulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(anim, {
              toValue: 1,
              duration: 1200,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.timing(anim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      );

    Animated.parallel([
      createPulse(ring1, 0),
      createPulse(ring2, 400),
      createPulse(ring3, 800),
    ]).start();
  }, []);

  const createRingStyle = (anim: Animated.Value) => ({
    position: 'absolute' as const,
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: color,
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] }),
    transform: [
      {
        scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 2] }),
      },
    ],
  });

  return (
    <View
      style={{
        width: size * 2,
        height: size * 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Animated.View style={createRingStyle(ring1)} />
      <Animated.View style={createRingStyle(ring2)} />
      <Animated.View style={createRingStyle(ring3)} />
      <View
        style={{
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: (size * 0.35) / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

// ─── 2. BOUNCING DOTS LOADER ──────────────────────────────────────────────────
export const BouncingDotsLoader: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = '#EC4899', size = 12 }) => {
  const dots = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  useEffect(() => {
    const bounce = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: -18,
            duration: 350,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 350,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay(500 - delay),
        ]),
      );

    Animated.parallel([
      bounce(dots[0], 0),
      bounce(dots[1], 150),
      bounce(dots[2], 300),
    ]).start();
  }, []);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      {dots.map((dot, i) => (
        <Animated.View
          key={i}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: color,
            transform: [{ translateY: dot }],
          }}
        />
      ))}
    </View>
  );
};

// ─── 3. ROTATING ARC LOADER ───────────────────────────────────────────────────
export const RotatingArcLoader: React.FC<{ color?: string; size?: number }> = ({
  color = '#EC4899',
  size = 48,
}) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const innerRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.timing(innerRotation, {
        toValue: -1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const innerSpin = innerRotation.interpolate({
    inputRange: [-1, 0],
    outputRange: ['-360deg', '0deg'],
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Outer ring */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 3,
          borderColor: `${color}30`,
          borderTopColor: color,
          transform: [{ rotate: spin }],
        }}
      />
      {/* Inner ring (counter-rotate) */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size * 0.65,
          height: size * 0.65,
          borderRadius: (size * 0.65) / 2,
          borderWidth: 2.5,
          borderColor: `${color}20`,
          borderBottomColor: color,
          transform: [{ rotate: innerSpin }],
        }}
      />
      {/* Center dot */}
      <View
        style={{
          width: size * 0.18,
          height: size * 0.18,
          borderRadius: (size * 0.18) / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
};

// ─── 4. HEARTBEAT / WAVE LOADER ───────────────────────────────────────────────
export const WaveLoader: React.FC<{ color?: string }> = ({
  color = '#EC4899',
}) => {
  const bars = Array.from(
    { length: 5 },
    () => useRef(new Animated.Value(0.3)).current,
  );

  useEffect(() => {
    const wave = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0.3,
            duration: 300,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay(600 - delay),
        ]),
      );

    Animated.parallel(bars.map((b, i) => wave(b, i * 100))).start();
  }, []);

  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', height: 40, gap: 4 }}
    >
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={{
            width: 5,
            height: 40,
            borderRadius: 3,
            backgroundColor: color,
            transform: [{ scaleY: bar }],
          }}
        />
      ))}
    </View>
  );
};

// ─── 5. MORPHING BLOB LOADER ──────────────────────────────────────────────────
export const MorphingLoader: React.FC<{ color?: string; size?: number }> = ({
  color = '#EC4899',
  size = 52,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 1.3,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scale, {
            toValue: 0.8,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <View
      style={{
        width: size * 1.6,
        height: size * 1.6,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Halo */}
      <Animated.View
        style={{
          position: 'absolute',
          width: size * 1.4,
          height: size * 1.4,
          borderRadius: (size * 1.4) / 2,
          backgroundColor: `${color}18`,
          transform: [{ scale }],
        }}
      />
      {/* Core */}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          opacity,
          transform: [{ scale }],
        }}
      />
    </View>
  );
};

// ─── 6. FULL-SCREEN OVERLAY LOADER (for page loads) ──────────────────────────
interface FullScreenLoaderProps {
  visible: boolean;
  message?: string;
  color?: string;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  visible,
  message = 'Loading...',
  color = '#EC4899',
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none">
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.loaderCard}>
          {/* Logo / brand ring */}
          <View style={[styles.brandRing, { borderColor: `${color}25` }]}>
            <RotatingArcLoader color={color} size={52} />
          </View>
          <Text style={styles.loadingMessage}>{message}</Text>
          <BouncingDotsLoader color={color} size={8} />
        </View>
      </Animated.View>
    </Modal>
  );
};

// ─── 7. INLINE CARD LOADER (for list items, images etc.) ─────────────────────
export const SkeletonLoader: React.FC<{ lines?: number }> = ({ lines = 3 }) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const bgOpacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.06, 0.14],
  });

  const SkeletonLine = ({ width }: { width: number }) => (
    <Animated.View
      style={{
        height: 12,
        width,
        borderRadius: 6,
        backgroundColor: '#EC4899',
        opacity: bgOpacity,
        marginBottom: 10,
      }}
    />
  );

  return (
    <View style={styles.skeletonCard}>
      {/* Avatar placeholder */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 14 }}>
        <Animated.View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#EC4899',
            opacity: bgOpacity,
          }}
        />
        <View style={{ flex: 1, justifyContent: 'center', gap: 8 }}>
          <SkeletonLine width={55} />
          <SkeletonLine width={35} />
        </View>
      </View>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width={i === lines - 1 ? 60 : 100} />
      ))}
    </View>
  );
};

// ─── 8. BUTTON INLINE LOADER ──────────────────────────────────────────────────
export const ButtonLoader: React.FC<{ color?: string }> = ({
  color = '#fff',
}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <BouncingDotsLoader color={color} size={7} />
    </View>
  );
};

// ─── USAGE DEMO (remove in production) ───────────────────────────────────────
export const LoaderShowcase: React.FC = () => {
  return (
    <View style={styles.showcase}>
      <Text style={styles.title}>Loader Showcase</Text>

      <View style={styles.row}>
        <View style={styles.cell}>
          <PulseRingLoader />
          <Text style={styles.label}>Pulse Ring</Text>
        </View>
        <View style={styles.cell}>
          <RotatingArcLoader />
          <Text style={styles.label}>Rotating Arc</Text>
        </View>
        <View style={styles.cell}>
          <MorphingLoader />
          <Text style={styles.label}>Morphing</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <BouncingDotsLoader />
          <Text style={styles.label}>Bouncing Dots</Text>
        </View>
        <View style={styles.cell}>
          <WaveLoader />
          <Text style={styles.label}>Wave Bars</Text>
        </View>
        <View style={styles.cell}>
          <ButtonLoader color="#EC4899" />
          <Text style={styles.label}>Button</Text>
        </View>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
        <Text style={styles.sectionLabel}>Skeleton Card</Text>
        <SkeletonLoader lines={3} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 48,
    alignItems: 'center',
    gap: 18,
    shadowColor: '#EC4899',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  brandRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingMessage: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: 0.2,
  },
  skeletonCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  showcase: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    paddingTop: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  cell: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '600',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
