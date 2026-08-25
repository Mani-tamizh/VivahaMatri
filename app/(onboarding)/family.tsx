import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm as useRHForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { FamilyForm, familySchema } from '../../src/schemas/onboardingSchema';
import { StepIndicator } from '../../src/components/StepIndicator';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { ChipSelector } from '../../src/components/ChipSelector';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function FamilyStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useRHForm<FamilyForm>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      father_name: data.father_name || '',
      mother_name: data.mother_name || '',
      family_status: data.family_status || '',
      family_type: data.family_type || '',
      family_location: data.family_location || '',
      siblings_details: data.siblings_details || '',
    },
  });

  const onSubmit = (formData: FamilyForm) => {
    updateData(formData);
    router.push('/(onboarding)/about');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <StepIndicator currentStep={7} totalSteps={10} />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Tell us about your family</Text>

        <Controller
          control={control}
          name="father_name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Father's Name (Optional)"
              placeholder="Enter father's name"
              value={value}
              onChangeText={onChange}
              error={errors.father_name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="mother_name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Mother's Name (Optional)"
              placeholder="Enter mother's name"
              value={value}
              onChangeText={onChange}
              error={errors.mother_name?.message}
            />
          )}
        />

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Family Status (Optional)</Text>
          <Controller
            control={control}
            name="family_status"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['Middle Class', 'Upper Middle Class', 'Rich / Affluent']}
                selectedOption={value}
                onSelect={onChange}
                horizontal={false}
              />
            )}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Family Type (Optional)</Text>
          <Controller
            control={control}
            name="family_type"
            render={({ field: { onChange, value } }) => (
              <ChipSelector
                options={['Joint Family', 'Nuclear Family']}
                selectedOption={value}
                onSelect={onChange}
              />
            )}
          />
        </View>

        <Controller
          control={control}
          name="family_location"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Family Location (Optional)"
              placeholder="e.g. Chennai, Tamil Nadu"
              value={value}
              onChangeText={onChange}
              error={errors.family_location?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="siblings_details"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Siblings Details (Optional)"
              placeholder="e.g. 1 elder brother, 1 younger sister"
              value={value}
              onChangeText={onChange}
              multiline
              numberOfLines={3}
              style={{ height: 80, paddingTop: 12 }}
              error={errors.siblings_details?.message}
            />
          )}
        />
        
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
