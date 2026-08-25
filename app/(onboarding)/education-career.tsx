import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm as useRHForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { EducationCareerForm, educationCareerSchema } from '../../src/schemas/onboardingSchema';
import { StepIndicator } from '../../src/components/StepIndicator';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { ChipSelector } from '../../src/components/ChipSelector';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function EducationCareerStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useRHForm<EducationCareerForm>({
    resolver: zodResolver(educationCareerSchema),
    defaultValues: {
      education: data.education || '',
      occupation: data.occupation || '',
      annual_income: data.annual_income || '',
    },
  });

  const onSubmit = (formData: EducationCareerForm) => {
    updateData(formData);
    router.push('/(onboarding)/location');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <StepIndicator currentStep={5} totalSteps={10} />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Education & Career</Text>

        <Controller
          control={control}
          name="education"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Highest Education"
              placeholder="e.g. B.E / Computer Science"
              value={value}
              onChangeText={onChange}
              error={errors.education?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="occupation"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Occupation"
              placeholder="e.g. Software Engineer"
              value={value}
              onChangeText={onChange}
              error={errors.occupation?.message}
            />
          )}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Annual Income (Optional)</Text>
          <Controller
            control={control}
            name="annual_income"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={[
                  'Below ₹3 Lakh',
                  '₹3 – ₹5 Lakh',
                  '₹5 – ₹10 Lakh',
                  '₹10 – ₹20 Lakh',
                  '₹20 Lakh+',
                  'Prefer not to say'
                ]}
                selectedOption={value}
                onSelect={onChange}
                horizontal={false}
              />
            )}
          />
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
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.text,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});
