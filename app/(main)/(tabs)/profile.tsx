import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { colors } from "../../../src/theme/colors";
import { spacing, borderRadius } from "../../../src/theme/spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Mock data to match the design
const mockProfile = {
  id: '1',
  name: "Priya Sharma",
  age: 26,
  isVerified: true,
  profession: "Software Engineer",
  location: "Chennai, Tamil Nadu",
  height: "5'4\"",
  religion: "Hindu",
  caste: "Iyer",
  matchPercentage: "98%",
  about:
    "I am a simple, kind and ambitious person who believes in hard work and honesty. Looking for a life partner who is supportive and understanding.",
  education: "B.E / Computer Science",
  company: "TCS",
  dob: "12 Jan 1999",
  maritalStatus: "Never Married",
  motherTongue: "Tamil",
  partnerPref: {
    age: "24 - 30 Years",
    height: "5'3\" - 5'10\"",
    education: "Any Graduate",
    location: "Tamil Nadu",
  },
  imageUri:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
};

export default function ProfileTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [contactUnlocked, setContactUnlocked] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Feather name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="more-vertical" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Top Profile Block */}
        <View style={styles.topProfileBlock}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: mockProfile.imageUri }} style={styles.profileImage} />
            <View style={styles.imageOverlayBottom}>
              <Text style={styles.imageIndicatorText}>1 / 6</Text>
              <View style={styles.imageHeartCircle}>
                <Feather name="heart" size={14} color={colors.primary} />
              </View>
            </View>
          </View>

          <View style={styles.profileDetailsRight}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>{mockProfile.name}, {mockProfile.age}</Text>
              {mockProfile.isVerified && (
                <MaterialIcons name="verified" size={16} color="#00C853" style={styles.verifiedIcon} />
              )}
            </View>
            
            <View style={styles.infoRow}>
              <Feather name="briefcase" size={14} color={colors.textSecondary} />
              <Text style={styles.infoText}>{mockProfile.profession}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Feather name="map-pin" size={14} color={colors.textSecondary} />
              <Text style={styles.infoText}>{mockProfile.location}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="human-male-height" size={14} color={colors.textSecondary} />
              <Text style={styles.infoText}>{mockProfile.height} • {mockProfile.religion} - {mockProfile.caste}</Text>
            </View>

            <View style={styles.matchRow}>
              <Feather name="heart" size={14} color={colors.primary} />
              <Text style={styles.matchText}>{mockProfile.matchPercentage} Match</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity style={styles.shortlistButton}>
            <Feather name="heart" size={18} color={colors.primary} />
            <Text style={styles.shortlistButtonText}>Shortlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendInterestButton}>
            <Feather name="send" size={18} color="#FFFFFF" />
            <Text style={styles.sendInterestButtonText}>Send Interest</Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About</Text>
          <Text style={styles.aboutText}>{mockProfile.about}</Text>
          <TouchableOpacity>
            <Text style={styles.readMoreText}>...Read More</Text>
          </TouchableOpacity>
        </View>

        {/* Basic Details Section */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Basic Details</Text>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={14} color={colors.primary} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="book-open" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Education</Text>
                <Text style={styles.gridValue}>{mockProfile.education}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="calendar" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Date of Birth</Text>
                <Text style={styles.gridValue}>{mockProfile.dob}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="briefcase" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Profession</Text>
                <Text style={styles.gridValue}>{mockProfile.profession}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="star" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Marital Status</Text>
                <Text style={styles.gridValue}>{mockProfile.maritalStatus}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="home" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Company</Text>
                <Text style={styles.gridValue}>{mockProfile.company}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="flag" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Mother Tongue</Text>
                <Text style={styles.gridValue}>{mockProfile.motherTongue}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Partner Preferences Section */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Partner Preferences</Text>
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={14} color={colors.primary} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="user" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Age</Text>
                <Text style={styles.gridValue}>{mockProfile.partnerPref.age}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <MaterialCommunityIcons name="human-male-height" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Height</Text>
                <Text style={styles.gridValue}>{mockProfile.partnerPref.height}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="book-open" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Education</Text>
                <Text style={styles.gridValue}>{mockProfile.partnerPref.education}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.gridIconCircle}>
                <Feather name="map-pin" size={14} color={colors.primary} />
              </View>
              <View style={styles.gridTextContainer}>
                <Text style={styles.gridLabel}>Location</Text>
                <Text style={styles.gridValue}>{mockProfile.partnerPref.location}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Details Section */}
        <View style={styles.contactCard}>
          <View style={styles.contactTopRow}>
            <View style={styles.contactIconCircle}>
              <Feather name="lock" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.contactTextContainer}>
              <Text style={styles.contactTitle}>Contact Details</Text>
              <Text style={styles.contactDesc}>
                Contact number is available{'\n'}for premium members only.
              </Text>
            </View>
            <TouchableOpacity 
              style={styles.unlockButton}
              onPress={() => router.push("/(main)/unlock-contact")}
            >
              <View style={styles.unlockButtonRow}>
                <Feather name="lock" size={14} color="#FFFFFF" />
                <Text style={styles.unlockButtonText}>Unlock Contact</Text>
              </View>
              <Text style={styles.unlockButtonPrice}>₹1,000 for 1 Year</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contactFeaturesRow}>
            <View style={styles.contactFeatureItem}>
              <Feather name="check-circle" size={12} color={colors.primary} />
              <Text style={styles.contactFeatureText}>View Contact Number</Text>
            </View>
            <View style={styles.contactFeatureItem}>
              <Feather name="message-circle" size={12} color={colors.primary} />
              <Text style={styles.contactFeatureText}>Chat & Communicate</Text>
            </View>
            <View style={styles.contactFeatureItem}>
              <Feather name="star" size={12} color={colors.primary} />
              <Text style={styles.contactFeatureText}>Priority Support</Text>
            </View>
            <View style={styles.contactFeatureItem}>
              <Feather name="check-square" size={12} color={colors.primary} />
              <Text style={styles.contactFeatureText}>1 Year Membership</Text>
            </View>
          </View>
        </View>

        {/* Bottom Actions (Report / Block) */}
        <View style={styles.bottomActionsRow}>
          <TouchableOpacity style={styles.bottomActionItem}>
            <Feather name="flag" size={16} color={colors.primary} />
            <Text style={styles.bottomActionText}>Report Profile</Text>
          </TouchableOpacity>
          <View style={styles.verticalDivider} />
          <TouchableOpacity style={styles.bottomActionItem}>
            <Feather name="slash" size={16} color={colors.primary} />
            <Text style={styles.bottomActionText}>Block Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: "#F9F9F9",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  iconButton: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  topProfileBlock: {
    flexDirection: 'row',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  imageContainer: {
    width: 140,
    height: 180,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlayBottom: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageIndicatorText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  imageHeartCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDetailsRight: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    flexShrink: 1,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    backgroundColor: '#FFF0F3',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  matchText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  shortlistButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
    marginRight: spacing.sm,
    backgroundColor: '#FFFFFF',
  },
  shortlistButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  sendInterestButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
  },
  sendInterestButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  aboutText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  readMoreText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "right",
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  gridIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF0F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  gridTextContainer: {
    flex: 1,
  },
  gridLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  gridValue: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
  contactCard: {
    backgroundColor: '#FFF0F3',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  contactTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  contactIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTextContainer: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
  contactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  contactDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  unlockButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  unlockButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  unlockButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  unlockButtonPrice: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
  },
  contactFeaturesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  contactFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: spacing.sm,
  },
  contactFeatureText: {
    fontSize: 10,
    color: colors.text,
    marginLeft: 4,
  },
  bottomActionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  bottomActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  bottomActionText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  verticalDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#DDDDDD',
  }
});
