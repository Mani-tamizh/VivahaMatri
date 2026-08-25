import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm as useRHForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { AboutYouForm, aboutYouSchema } from '../../src/schemas/onboardingSchema';
import { StepIndicator } from '../../src/components/StepIndicator';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { ChipSelector } from '../../src/components/ChipSelector';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function AboutYouStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useRHForm<AboutYouForm>({
    resolver: zodResolver(aboutYouSchema),
    defaultValues: {
      name: data.name || '',
      gender: (data.gender as any) || undefined,
      dob: data.dob || '',
      marital_status: (data.marital_status as any) || undefined,
      no_of_kids: data.no_of_kids || '',
      mother_tongue: data.mother_tongue || '',
    },
  });

  const maritalStatus = watch('marital_status');
  const showKidsField = ['Divorced', 'Widowed', 'Separated'].includes(maritalStatus);

  const onSubmit = (formData: AboutYouForm) => {
    updateData(formData);
    router.push('/(onboarding)/personal-details');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <StepIndicator currentStep={2} totalSteps={10} />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tell us about yourself</Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              error={errors.name?.message}
            />
          )}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Gender</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['Male', 'Female']}
                selectedOption={value}
                onSelect={onChange}
              />
            )}
          />
          {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}
        </View>

        <Controller
          control={control}
          name="dob"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              value={value}
              onChangeText={onChange}
              error={errors.dob?.message}
            />
          )}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Marital Status</Text>
          <Controller
            control={control}
            name="marital_status"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['Unmarried', 'Divorced', 'Widowed', 'Separated']}
                selectedOption={value}
                onSelect={onChange}
                horizontal={false} // wrap
              />
            )}
          />
          {errors.marital_status && <Text style={styles.errorText}>{errors.marital_status.message}</Text>}
        </View>

        {showKidsField && (
          <Controller
            control={control}
            name="no_of_kids"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Number of Children"
                placeholder="e.g. 0, 1, 2"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
                error={errors.no_of_kids?.message}
              />
            )}
          />
        )}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Mother Tongue</Text>
          <Controller
            control={control}
            name="mother_tongue"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi']}
                selectedOption={value}
                onSelect={onChange}
                horizontal={false}
              />
            )}
          />
          {errors.mother_tongue && <Text style={styles.errorText}>{errors.mother_tongue.message}</Text>}
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
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});
