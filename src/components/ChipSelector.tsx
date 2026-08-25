import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

interface ChipSelectorProps {
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
  horizontal?: boolean;
}

export const ChipSelector = ({ options, selectedOption, onSelect, horizontal = true }: ChipSelectorProps) => {
  const content = options.map((option) => {
    const isSelected = selectedOption === option;
    return (
      <TouchableOpacity
        key={option}
        style={[styles.chip, isSelected && styles.chipSelected]}
        onPress={() => onSelect(option)}
      >
        <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  });

  if (horizontal) {
    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.containerHorizontal}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={styles.containerVertical}>{content}</View>;
};

const styles = StyleSheet.create({
  containerHorizontal: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  containerVertical: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  chipSelected: {
    borderColor: colors.primary,
    backgroundColor: '#FFF0F3',
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextSelected: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});
