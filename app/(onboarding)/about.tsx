import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm as useRHForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { AboutExpectationsForm, aboutExpectationsSchema } from '../../src/schemas/onboardingSchema';
import { StepIndicator } from '../../src/components/StepIndicator';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function AboutStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useRHForm<AboutExpectationsForm>({
    resolver: zodResolver(aboutExpectationsSchema),
    defaultValues: {
      about: data.about || '',
      expectations: data.expectations || '',
    },
  });

  const aboutText = watch('about');
  const expectationsText = watch('expectations');

  const onSubmit = (formData: AboutExpectationsForm) => {
    updateData(formData);
    router.push('/(onboarding)/contact-consent');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <StepIndicator currentStep={8} totalSteps={10} />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Create your introduction</Text>

        <View style={styles.fieldContainer}>
          <Controller
            control={control}
            name="about"
            render={({ field: { onChange, value } }) => (
              <Input
                label="About You (Optional)"
                placeholder="Tell potential matches a little about yourself..."
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={5}
                style={styles.textArea}
                error={errors.about?.message}
                maxLength={500}
              />
            )}
          />
          <Text style={styles.counter}>{aboutText?.length || 0}/500</Text>
        </View>

        <View style={styles.fieldContainer}>
          <Controller
            control={control}
            name="expectations"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Partner Expectations (Optional)"
                placeholder="What are you looking for in a life partner?"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={5}
                style={styles.textArea}
                error={errors.expectations?.message}
                maxLength={500}
              />
            )}
          />
          <Text style={styles.counter}>{expectationsText?.length || 0}/500</Text>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Continue" 
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  title: {
    ...typography.title,
    marginBottom: spacing.xl,
  },
  fieldContainer: {
    marginBottom: spacing.sm,
  },
  textArea: {
    height: 120,
    paddingTop: spacing.md,
    textAlignVertical: 'top',
  },
  counter: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'right',
    marginTop: -spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});
