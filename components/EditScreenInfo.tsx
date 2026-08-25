import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Text, View } from './Themed';

type ForkliftDetails = {
  weight: string;
  height: string;
  loadCap: string;
  loadCenter: string;
  carWidth: string;
  baseWheel: string;
  cg: string;
  carCenter: number;
};

type FormFieldProps = {
  label: string;
  unit: string;
  value: string;
  onChangeText: (value: string) => void;
  isLast?: boolean;
};

const initialDetails: ForkliftDetails = {
  weight: '',
  height: '',
  loadCap: '',
  loadCenter: '',
  carWidth: '',
  baseWheel: '',
  cg: '',
  carCenter: 0,
};

export default function EditScreenInfo({ path: _path }: { path: string }) {
  const [details, setDetails] = React.useState<ForkliftDetails>(initialDetails);

  React.useEffect(() => {
    async function loadSavedDetails() {
      const savedValue = await AsyncStorage.getItem('forklift');

      if (savedValue) {
        setDetails({ ...initialDetails, ...JSON.parse(savedValue) });
      }
    }

    loadSavedDetails();
  }, []);

  const updateDetail = (key: keyof Omit<ForkliftDetails, 'carCenter'>, value: string) => {
    setDetails((currentDetails) => ({ ...currentDetails, [key]: value }));
  };

  const saveDetails = async () => {
    const carCenter = Number(details.carWidth) / 2 || 0;
    const updatedDetails = { ...details, carCenter };

    setDetails(updatedDetails);
    await AsyncStorage.setItem('forklift', JSON.stringify(updatedDetails));
  };

  const centerline = details.carWidth ? `${details.carCenter || Number(details.carWidth) / 2} m` : '--';

  return (
    <View style={styles.page} lightColor="#f5f7f6" darkColor="#101614">
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header} lightColor="#f5f7f6" darkColor="#101614">
            <View style={styles.eyebrowRow} lightColor="transparent" darkColor="transparent">
              <View style={styles.eyebrowDot} lightColor="#db5d37" darkColor="#f17c55" />
              <Text style={styles.eyebrow}>EQUIPMENT PROFILE</Text>
            </View>
            <Text style={styles.title}>Forklift setup</Text>
            <Text style={styles.intro}>Keep the machine dimensions and load limits ready for every safety check.</Text>
          </View>

          <View style={styles.statusBand} lightColor="#173f38" darkColor="#1b4b43">
            <View style={styles.statusIcon} lightColor="#f0b44d" darkColor="#f0b44d">
              <Ionicons name="resize-outline" size={20} color="#173f38" />
            </View>
            <View style={styles.statusCopy} lightColor="transparent" darkColor="transparent">
              <Text style={styles.statusLabel} lightColor="#d6ebe3" darkColor="#d6ebe3">VEHICLE CENTERLINE</Text>
              <Text style={styles.statusValue} lightColor="#ffffff" darkColor="#ffffff">{centerline}</Text>
            </View>
            <Text style={styles.statusUnit} lightColor="#d6ebe3" darkColor="#d6ebe3">from vehicle edge</Text>
          </View>

          <SectionHeading icon="cube-outline" title="Load limits" caption="Rated operating values" />
          <View style={styles.formSurface} lightColor="#ffffff" darkColor="#19211e">
            <FormField label="Truck weight" unit="kg" value={details.weight} onChangeText={(value) => updateDetail('weight', value)} />
            <FormField label="Load capacity" unit="kg" value={details.loadCap} onChangeText={(value) => updateDetail('loadCap', value)} />
            <FormField label="Load center" unit="m" value={details.loadCenter} onChangeText={(value) => updateDetail('loadCenter', value)} isLast />
          </View>

          <SectionHeading icon="construct-outline" title="Vehicle geometry" caption="Dimensions used for stability" />
          <View style={styles.formSurface} lightColor="#ffffff" darkColor="#19211e">
            <FormField label="Vehicle width" unit="m" value={details.carWidth} onChangeText={(value) => updateDetail('carWidth', value)} />
            <FormField label="Wheelbase" unit="m" value={details.baseWheel} onChangeText={(value) => updateDetail('baseWheel', value)} />
            <FormField label="Center of gravity to front axle" unit="m" value={details.cg} onChangeText={(value) => updateDetail('cg', value)} />
            <FormField label="Vehicle height" unit="m" value={details.height} onChangeText={(value) => updateDetail('height', value)} isLast />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveDetails} activeOpacity={0.86}>
            <Ionicons name="checkmark-circle-outline" size={21} color="#ffffff" />
            <Text style={styles.saveButtonText} lightColor="#ffffff" darkColor="#ffffff">Save vehicle profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function SectionHeading({ icon, title, caption }: { icon: keyof typeof Ionicons.glyphMap; title: string; caption: string }) {
  return (
    <View style={styles.sectionHeading} lightColor="transparent" darkColor="transparent">
      <View style={styles.sectionIcon} lightColor="#dcefe8" darkColor="#254c43">
        <Ionicons name={icon} size={18} color="#1f685b" />
      </View>
      <View lightColor="transparent" darkColor="transparent">
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionCaption}>{caption}</Text>
      </View>
    </View>
  );
}

function FormField({ label, unit, value, onChangeText, isLast = false }: FormFieldProps) {
  return (
    <View style={[styles.fieldRow, isLast && styles.fieldRowLast]} lightColor="transparent" darkColor="transparent">
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputShell} lightColor="#f3f6f4" darkColor="#101614">
        <TextInput
          style={styles.fieldInput}
          value={value}
          placeholder="0"
          placeholderTextColor="#8a9690"
          keyboardType="decimal-pad"
          onChangeText={onChangeText}
          maxLength={7}
          textAlign="right"
        />
        <Text style={styles.fieldUnit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1 },
  keyboardView: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 28, paddingBottom: 42 },
  header: { paddingBottom: 24 },
  eyebrowRow: { alignItems: 'center', flexDirection: 'row', gap: 8, marginBottom: 12 },
  eyebrowDot: { borderRadius: 3, height: 8, width: 8 },
  eyebrow: { color: '#4d625b', fontSize: 12, fontWeight: '700', letterSpacing: 0.8 },
  title: { color: '#173f38', fontSize: 30, fontWeight: '700', lineHeight: 36 },
  intro: { color: '#5b6c65', fontSize: 15, lineHeight: 22, marginTop: 6, maxWidth: 340 },
  statusBand: { alignItems: 'center', borderRadius: 8, flexDirection: 'row', marginBottom: 28, minHeight: 82, paddingHorizontal: 16 },
  statusIcon: { alignItems: 'center', borderRadius: 20, height: 40, justifyContent: 'center', width: 40 },
  statusCopy: { flex: 1, marginLeft: 12 },
  statusLabel: { fontSize: 10, fontWeight: '700', letterSpacing: 0.8 },
  statusValue: { fontSize: 23, fontWeight: '700', lineHeight: 28 },
  statusUnit: { fontSize: 11, maxWidth: 64, textAlign: 'right' },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', marginBottom: 10 },
  sectionIcon: { alignItems: 'center', borderRadius: 6, height: 34, justifyContent: 'center', marginRight: 10, width: 34 },
  sectionTitle: { color: '#243c34', fontSize: 16, fontWeight: '700', lineHeight: 19 },
  sectionCaption: { color: '#718079', fontSize: 12, lineHeight: 16 },
  formSurface: { borderColor: '#dce4df', borderRadius: 8, borderWidth: 1, marginBottom: 26, paddingHorizontal: 14 },
  fieldRow: { alignItems: 'center', borderBottomColor: '#e4e9e6', borderBottomWidth: 1, flexDirection: 'row', minHeight: 66 },
  fieldRowLast: { borderBottomWidth: 0 },
  fieldLabel: { color: '#33473f', flex: 1, fontSize: 14, lineHeight: 19, paddingRight: 12 },
  inputShell: { alignItems: 'center', borderRadius: 6, flexDirection: 'row', height: 38, width: 112 },
  fieldInput: { color: '#173f38', flex: 1, fontSize: 15, fontWeight: '600', height: '100%', paddingHorizontal: 10 },
  fieldUnit: { color: '#718079', fontSize: 12, paddingRight: 10 },
  saveButton: { alignItems: 'center', alignSelf: 'stretch', backgroundColor: '#db5d37', borderRadius: 8, flexDirection: 'row', height: 54, justifyContent: 'center' },
  saveButtonText: { fontSize: 16, fontWeight: '700', marginLeft: 9 },
});
