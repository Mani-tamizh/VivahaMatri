import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useOnboardingStore } from "../../src/store/onboardingStore";
import { StepIndicator } from "../../src/components/StepIndicator";
import { Button } from "../../src/components/Button";
import { colors } from "../../src/theme/colors";
import { spacing, borderRadius } from "../../src/theme/spacing";
import { typography } from "../../src/theme/typography";

export default function PhotoStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();
  const [photo, setPhoto] = useState<string | null>(
    data.profilePhotoUri || null,
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleContinue = () => {
    if (photo) {
      updateData({ profilePhotoUri: photo });
    }
    router.push("/(onboarding)/about-you");
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <StepIndicator currentStep={1} totalSteps={10} />

      <View style={styles.content}>
        <Text style={styles.title}>Let's add your profile photo</Text>
        <Text style={styles.description}>
          A clear photo helps you get better responses.
        </Text>

        <View style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder}>
              <Feather name="camera" size={40} color={colors.textSecondary} />
            </View>
          )}

          <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
            <Text style={styles.changeButtonText}>
              {photo ? "Change Photo" : "Upload Photo"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Continue"
          onPress={handleContinue}
          // Allowing continue without photo for MVP if they want
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButton: {
    padding: spacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    alignItems: "center",
  },
  title: {
    ...typography.title,
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xxl,
  },
  photoContainer: {
    alignItems: "center",
  },
  photo: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#F0F0F0",
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  changeButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    backgroundColor: "#FFF0F3",
  },
  changeButtonText: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
});
