import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

type SplashScreenProps = {
  onFinish: () => void;
};

// Simulated Petal Component
const Petal = ({ startX, delay }: { startX: number; delay: number }) => {
  const translateY = useSharedValue(-50);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withTiming(height + 50, { duration: 3000, easing: Easing.linear }),
    );
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(0.8, { duration: 500 }),
        withTiming(0.8, { duration: 2000 }),
        withTiming(0, { duration: 500 }),
      ),
    );
    rotate.value = withDelay(
      delay,
      withTiming(360, { duration: 3000, easing: Easing.linear }),
    );
  }, [delay, translateY, opacity, rotate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.petal, { left: startX }, animatedStyle]} />
  );
};

export function SplashScreen({ onFinish }: SplashScreenProps) {
  // 1. Shared values for rings
  const ringsScale = useSharedValue(0.8);
  const ringsOpacity = useSharedValue(0);

  // 2. Shared value for hearts
  const heartsScale = useSharedValue(0);

  // 3. Shared values for logo text
  const logoTranslateY = useSharedValue(20);
  const logoOpacity = useSharedValue(0);

  // 4. Shared values for tagline
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // 0ms - 600ms: Petals begin falling (handled individually by Petal components)

    // 600ms - 1.4s: Rings appear with scale and glow
    ringsOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
    ringsScale.value = withDelay(
      600,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.5)) }),
    );

    // 1.4s - 2.0s: Hearts pop with bounce
    heartsScale.value = withDelay(
      1400,
      withSpring(1, { damping: 10, stiffness: 100 }),
    );

    // 2.0s - 2.6s: "VivahaMatri" slides up & fades in
    logoOpacity.value = withDelay(2000, withTiming(1, { duration: 600 }));
    logoTranslateY.value = withDelay(
      2000,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }),
    );

    // 2.6s - 3.2s: Tagline fades in
    taglineOpacity.value = withDelay(2600, withTiming(1, { duration: 600 }));

    // 3.2s - 4.2s: Hold (handled by timeout)
    // After 4.2s: Trigger finish callback
    const timer = setTimeout(() => {
      onFinish();
    }, 4200);

    return () => clearTimeout(timer);
  }, [
    ringsOpacity,
    ringsScale,
    heartsScale,
    logoOpacity,
    logoTranslateY,
    taglineOpacity,
    onFinish,
  ]);

  const ringsStyle = useAnimatedStyle(() => ({
    opacity: ringsOpacity.value,
    transform: [{ scale: ringsScale.value }],
  }));

  const heartsStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartsScale.value }],
  }));

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  // Generate 20 petals
  const petals = Array.from({ length: 20 }).map((_, i) => (
    <Petal
      key={i}
      startX={Math.random() * width}
      delay={Math.random() * 2000}
    />
  ));

  return (
    <View style={styles.container}>
      {petals}

      <View style={styles.content}>
        <Animated.View style={[styles.ringsContainer, ringsStyle]}>
          <Animated.Image
            source={require("../../assets/images/splash-ring.png")}
            style={styles.ringImage}
            resizeMode="contain"
          />
          <Animated.View style={[styles.heartsContainer, heartsStyle]}>
            <Animated.Image
              source={require("../../assets/images/splash-heart.png")}
              style={styles.heartSmall}
              resizeMode="contain"
            />
            <Animated.Image
              source={require("../../assets/images/splash-heart.png")}
              style={styles.heartLarge}
              resizeMode="contain"
            />
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.logoContainer, logoStyle]}>
          <Animated.Image
            source={require("../../assets/images/splash-title.png")}
            style={styles.titleImage}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.taglineContainer, taglineStyle]}>
          <FontAwesome
            name="heart"
            size={12}
            color="#FF1493"
            style={styles.taglineHeart}
          />
          <Text style={styles.tagline}>Find your perfect match</Text>
          <Text style={styles.tagline}>for a beautiful journey together</Text>
          <FontAwesome
            name="heart"
            size={12}
            color="#FF1493"
            style={styles.taglineHeart}
          />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE4E1", // Soft misty rose pink background
    overflow: "hidden",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -50, // Shift everything up slightly
  },
  petal: {
    position: "absolute",
    top: -20,
    width: 15,
    height: 15,
    backgroundColor: "#FFB6C1", // Light pink
    borderTopLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 2,
  },
  ringsContainer: {
    width: 200,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  ringImage: {
    width: 160,
    height: 120,
  },
  heartsContainer: {
    position: "absolute",
    top: -30,
    flexDirection: "row",
    alignItems: "flex-end",
    zIndex: 10,
  },
  heartSmall: {
    width: 30,
    height: 30,
    marginRight: -10,
    marginBottom: 10,
  },
  heartLarge: {
    width: 50,
    height: 50,
  },
  logoContainer: {
    marginBottom: 20,
  },
  titleImage: {
    width: 250,
    height: 60,
  },
  taglineContainer: {
    alignItems: "center",
  },
  tagline: {
    fontSize: 16,
    color: "#555",
    fontStyle: "italic",
    marginTop: 2,
  },
  taglineHeart: {
    marginVertical: 5,
  },
});
