import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useForm as useRHForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useOnboardingStore } from '../../src/store/onboardingStore';
import { CommunityForm, communitySchema } from '../../src/schemas/onboardingSchema';
import { StepIndicator } from '../../src/components/StepIndicator';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { typography } from '../../src/theme/typography';

export default function CommunityStep() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, updateData } = useOnboardingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useRHForm<CommunityForm>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      caste: data.caste || '',
      sub_caste: data.sub_caste || '',
      gothram: data.gothram || '',
      star: data.star || '',
      rasi: data.rasi || '',
    },
  });

  const onSubmit = (formData: CommunityForm) => {
    updateData(formData);
    router.push('/(onboarding)/education-career');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
      
      <StepIndicator currentStep={4} totalSteps={10} />

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your community details</Text>

        <Controller
          control={control}
          name="caste"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Caste (Optional)"
              placeholder="e.g. Iyer, Rajput, Agarwal"
              value={value}
              onChangeText={onChange}
              error={errors.caste?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="sub_caste"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Sub Caste (Optional)"
              placeholder="Enter sub caste"
              value={value}
              onChangeText={onChange}
              error={errors.sub_caste?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="gothram"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Gothram (Optional)"
              placeholder="Enter gothram"
              value={value}
              onChangeText={onChange}
              error={errors.gothram?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="star"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Star / Nakshatra (Optional)"
              placeholder="Enter star"
              value={value}
              onChangeText={onChange}
              error={errors.star?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="rasi"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Rasi / Moon Sign (Optional)"
              placeholder="Enter rasi"
              value={value}
              onChangeText={onChange}
              error={errors.rasi?.message}
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
  footer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
});
