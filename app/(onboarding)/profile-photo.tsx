import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Screen } from '../../src/components/Screen';
import { Button } from '../../src/components/Button';
import { spacing, borderRadius } from '../../src/theme/spacing';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { useAuthStore } from '../../src/store/authStore';

export default function ProfilePhoto() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const { setAuthState } = useAuthStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleFinish = () => {
    if (!image) {
      Alert.alert('Please select a photo');
      return;
    }
    // Submit image to backend here
    setAuthState('authenticated');
    router.replace('/(main)/(tabs)');
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add your best photo</Text>
        <Text style={styles.subtitle}>Profiles with photos get 5x more responses.</Text>

        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No Photo</Text>
            </View>
          )}
        </View>

        <Button title={image ? "Change Photo" : "Select Photo"} onPress={pickImage} variant="outline" />
      </View>
      
      <View style={styles.footer}>
        <Button title="Finish Onboarding" onPress={handleFinish} disabled={!image} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...typography.heading,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
    textAlign: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    backgroundColor: colors.border,
    marginBottom: spacing.xl,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  footer: {
    padding: spacing.xl,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  }
});
