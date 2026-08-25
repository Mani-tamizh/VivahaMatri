import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { spacing } from "../../src/theme/spacing";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <Image
        source={require("../../assets/images/welcome-bg.png")}
        style={styles.image}
        resizeMode="cover"
      />

      {/* SVG Blob Transition */}
      <View style={styles.svgContainer}>
        <Svg height="60" width={width} viewBox={`0 0 ${width} 60`}>
          <Path
            d={`M0,60 L0,30 C${width * 0.3},0 ${width * 0.7},60 ${width},30 L${width},60 Z`}
            fill="#FFFFFF"
          />
        </Svg>
      </View>

      {/* Bottom Content */}
      <View
        style={[
          styles.bottomSheet,
          { paddingBottom: Math.max(insets.bottom, spacing.xl) },
        ]}
      >
        {/* Primary Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/(auth)/phone")}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <Feather
            name="arrow-right"
            size={20}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>

        {/* Secondary Button */}
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/(auth)/phone")}
        >
          <MaterialCommunityIcons
            name="account-group"
            size={20}
            color="#FF4B72"
          />
          <Text style={styles.secondaryButtonText}>I'm Already a Member</Text>
        </TouchableOpacity>

        {/* Trust Badges */}
        <View style={styles.trustContainer}>
          <View style={styles.trustItem}>
            <MaterialCommunityIcons
              name="shield-check-outline"
              size={24}
              color="#FF4B72"
            />
            <Text style={styles.trustText}>100% Secure</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <MaterialCommunityIcons
              name="account-check-outline"
              size={24}
              color="#FF4B72"
            />
            <Text style={styles.trustText}>Verified Profiles</Text>
          </View>
          <View style={styles.trustDivider} />
          <View style={styles.trustItem}>
            <MaterialCommunityIcons
              name="lock-outline"
              size={24}
              color="#FF4B72"
            />
            <Text style={styles.trustText}>Privacy Focused</Text>
          </View>
        </View>

        {/* Bottom Decoration */}
        <View style={styles.bottomDeco}>
          <View style={styles.decoLine} />
          <MaterialCommunityIcons
            name="heart"
            size={12}
            color="#FF4B72"
            style={styles.decoHeart}
          />
          <View style={styles.decoLine} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    flex: 1,
  },
  svgContainer: {
    width: "100%",
    backgroundColor: "transparent",
    marginTop: -59, // Overlaps the image slightly to create a seamless transition
    zIndex: 10,
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    paddingTop: 10,
  },
  primaryButton: {
    backgroundColor: "#FF4B72",
    height: 56,
    width: "100%",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  arrowIcon: {
    position: "absolute",
    right: 20,
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    height: 56,
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFB6C1",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  secondaryButtonText: {
    color: "#FF4B72",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  trustContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  trustItem: {
    alignItems: "center",
    flex: 1,
  },
  trustDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#EEEEEE",
    marginTop: 5,
  },
  trustText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 8,
    textAlign: "center",
  },
  bottomDeco: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  decoLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#FFB6C1",
  },
  decoHeart: {
    marginHorizontal: 8,
  },
});
