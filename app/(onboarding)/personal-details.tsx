import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm as useRHForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { PersonalDetailsForm, personalDetailsSchema } from '../../src/schemas/onboardingSchema';
import { StepIndicator } from '../../src/components/StepIndicator';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { ChipSelector } from '../../src/components/ChipSelector';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function PersonalDetailsStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useRHForm<PersonalDetailsForm>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      height_cm: data.height_cm || '',
      weight_kg: data.weight_kg || '',
      body_type: data.body_type || '',
      blood_group: data.blood_group || '',
      complexion: data.complexion || '',
      physical_status: data.physical_status || '',
      diet: data.diet || '',
      smoke: data.smoke || '',
      drink: data.drink || '',
    },
  });

  const onSubmit = (formData: PersonalDetailsForm) => {
    updateData(formData);
    router.push('/(onboarding)/community');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <StepIndicator currentStep={3} totalSteps={10} />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Help us know you better</Text>

        <Controller
          control={control}
          name="height_cm"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Height (e.g. 5'4&quot;)"
              placeholder="Enter your height"
              value={value}
              onChangeText={onChange}
              error={errors.height_cm?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="weight_kg"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Weight (kg) (Optional)"
              placeholder="e.g. 65"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
              error={errors.weight_kg?.message}
            />
          )}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Body Type (Optional)</Text>
          <Controller
            control={control}
            name="body_type"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['Slim', 'Athletic', 'Average', 'Heavy']}
                selectedOption={value}
                onSelect={onChange}
              />
            )}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Diet (Optional)</Text>
          <Controller
            control={control}
            name="diet"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Vegan']}
                selectedOption={value}
                onSelect={onChange}
              />
            )}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Smoking (Optional)</Text>
          <Controller
            control={control}
            name="smoke"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['No', 'Occasionally', 'Yes']}
                selectedOption={value}
                onSelect={onChange}
              />
            )}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Drinking (Optional)</Text>
          <Controller
            control={control}
            name="drink"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['No', 'Occasionally', 'Yes']}
                selectedOption={value}
                onSelect={onChange}
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
