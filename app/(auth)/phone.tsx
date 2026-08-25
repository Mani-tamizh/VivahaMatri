import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../src/theme/colors";
import { spacing, borderRadius } from "../../src/theme/spacing";
import { typography } from "../../src/theme/typography";
import { authService } from "../../src/services/auth.service";

export default function PhoneScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    // Basic 10 digit validation
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await authService.sendOtp(`+91${cleanPhone}`);
      // Navigate to OTP screen with phone number parameter
      router.push({
        pathname: "/(auth)/otp",
        params: {
          phone: `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
        }, // Pass formatted for the UI
      });
    } catch (e) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View
        style={[
          styles.container,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        {/* Subtle Background decoration */}
        <View style={styles.bgDecoration} />

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.topSection}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.logoSubtitle}>
                Find your perfect life partner
              </Text>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <MaterialCommunityIcons
                  name="heart"
                  size={12}
                  color={colors.primary}
                />
                <View style={styles.dividerLine} />
              </View>
            </View>

            <Text style={styles.title}>Login / Get Started</Text>
            <Text style={styles.description}>
              Enter your mobile number to continue
            </Text>

            {/* Input Container */}
            <View
              style={[styles.inputWrapper, error ? styles.inputError : null]}
            >
              <View style={styles.countrySelector}>
                <Text style={styles.flagEmoji}>🇮🇳</Text>
                <Text style={styles.countryCode}>+91</Text>
                <Feather
                  name="chevron-down"
                  size={16}
                  color={colors.text}
                  style={{ marginLeft: 2 }}
                />
              </View>

              <View style={styles.verticalDivider} />

              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  setError("");
                }}
              />
            </View>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            {/* Info Box */}
            <View style={styles.infoRow}>
              <MaterialCommunityIcons
                name="shield-check"
                size={20}
                color={colors.primary}
              />
              <Text style={styles.infoText}>
                We will send you a 6 digit OTP{"\n"}to verify your number
              </Text>
            </View>

            {/* Main Button */}
            <TouchableOpacity
              style={[
                styles.btn,
                (loading || phone.length < 10) && styles.btnDisabled,
              ]}
              onPress={handleContinue}
              disabled={loading || phone.length < 10}
            >
              <Text style={styles.btnText}>
                {loading ? "Sending..." : "Send OTP"}
              </Text>
              {!loading && (
                <Feather name="arrow-right" size={20} color={colors.white} />
              )}
            </TouchableOpacity>

            {/* Security Note */}
            <View style={styles.securityRow}>
              <Feather name="lock" size={12} color={colors.textSecondary} />
              <Text style={styles.securityText}>
                Your number is safe with us.{"\n"}We don't share your details
                with anyone.
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By continuing, you agree to our
            </Text>
            <View style={styles.footerLinks}>
              <Text style={styles.linkText}>Terms of Service</Text>
              <Text style={styles.footerDivider}>|</Text>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  bgDecoration: {
    position: "absolute",
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "#FFF0F3",
    opacity: 0.5,
  },
  content: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  topSection: {
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  logoImage: {
    height: 60,
    width: 200,
    marginBottom: spacing.xs,
  },
  logoSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: 120,
    justifyContent: "center",
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#F0F0F0",
    flex: 1,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    height: 56,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F5F5F5",
    marginBottom: spacing.xs,
  },
  inputError: {
    borderColor: colors.error,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    height: "100%",
  },
  flagEmoji: {
    fontSize: 18,
    marginRight: 6,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
  },
  verticalDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E0E0E0",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  btn: {
    width: "100%",
    height: 56,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  securityRow: {
    alignItems: "center",
    gap: 6,
  },
  securityText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 16,
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.xxl,
  },
  footerText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  linkText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: "600",
  },
  footerDivider: {
    fontSize: 11,
    color: "#D0D0D0",
  },
});
