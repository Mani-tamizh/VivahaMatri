import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

export type ProfileData = {
  id: string;
  name: string;
  age: number;
  isVerified: boolean;
  profession: string;
  location: string;
  height?: string;
  religion?: string;
  caste?: string;
  imageUri: string;
  status?: string; // e.g. "Pending"
};

type ProfileCardProps = {
  profile: ProfileData;
  variant: 'shortlist' | 'received' | 'sent';
  onPress?: () => void;
  onAction?: (action: 'remove' | 'accept' | 'decline') => void;
};

export const ProfileCard = ({ profile, variant, onPress, onAction }: ProfileCardProps) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.topRow}>
        <Image source={{ uri: profile.imageUri }} style={styles.image} />
        
        <View style={styles.detailsContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText} numberOfLines={1}>
              {profile.name}, {profile.age}
            </Text>
            {profile.isVerified && (
              <MaterialIcons name="verified" size={16} color="#00C853" style={styles.verifiedIcon} />
            )}
            
            {variant === 'shortlist' && (
              <TouchableOpacity 
                style={styles.heartIcon} 
                onPress={(e) => {
                  e.stopPropagation();
                  onAction?.('remove');
                }}
              >
                <Feather name="heart" size={20} color={colors.primary} />
              </TouchableOpacity>
            )}
          </View>
          
          {variant !== 'received' && variant !== 'sent' && (
            <View style={styles.infoRow}>
              <Feather name="briefcase" size={12} color={colors.textSecondary} />
              <Text style={styles.infoText} numberOfLines={1}>{profile.profession}</Text>
            </View>
          )}

          {(variant === 'received' || variant === 'sent') && (
            <>
              <Text style={styles.simpleText}>{profile.location}</Text>
              <Text style={styles.simpleText}>{profile.profession}</Text>
            </>
          )}

          {variant === 'shortlist' && (
            <>
              <View style={styles.infoRow}>
                <Feather name="map-pin" size={12} color={colors.textSecondary} />
                <Text style={styles.infoText} numberOfLines={1}>{profile.location}</Text>
              </View>
              <Text style={styles.specsText}>
                {profile.height} • {profile.religion} • {profile.caste}
              </Text>
            </>
          )}
          
          {variant === 'sent' && (
            <View style={styles.statusRow}>
              <Text style={styles.statusText}>{profile.status || 'Pending'}</Text>
            </View>
          )}
        </View>
      </View>

      {variant === 'received' && (
        <View style={styles.actionsRow}>
          <TouchableOpacity 
            style={styles.declineButton}
            onPress={(e) => {
              e.stopPropagation();
              onAction?.('decline');
            }}
          >
            <Text style={styles.declineText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={(e) => {
              e.stopPropagation();
              onAction?.('accept');
            }}
          >
            <Text style={styles.acceptText}>Accept</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  topRow: {
    flexDirection: 'row',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#EEEEEE',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  heartIcon: {
    marginLeft: 'auto',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  specsText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
    fontWeight: '500',
  },
  simpleText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusRow: {
    alignItems: 'flex-end',
    marginTop: -10,
  },
  statusText: {
    fontSize: 12,
    color: '#FF9800', // Orange for pending
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingLeft: 70 + spacing.md, // align with text
  },
  declineButton: {
    flex: 1,
    height: 36,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  declineText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 13,
  },
  acceptButton: {
    flex: 1,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
  },
});
