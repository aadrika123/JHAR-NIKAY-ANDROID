import {
  Image,
  Linking,
  Modal,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import launch_splash from './assets/splah_screen.png';
import React, { useEffect } from 'react';
import {
  requestBluetoothPermission,
  requestCameraPermission,
  requestLocationPermission,
} from './src/utils/permission';
import { Navigation } from './src/routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const DismissKeyboard = ({ children }: { children: React.ReactNode }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const [loading, setLoading] = React.useState(true);
  const [permissionsGranted, setPermissionsGranted] = React.useState(false);
  const [showPermissionModal, setShowPermissionModal] = React.useState(false);

  useEffect(() => {
    if (!permissionsGranted) {
      requestBluetoothPermission();
      requestCameraPermission();
      requestLocationPermission();
    }
  }, [permissionsGranted]);

  React.useEffect(() => {
    setTimeout(async () => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleRequestPermissions = async () => {
    console.log('Opening app settings...');
    try {
      await Linking.openSettings();
      // After a short delay, check permissions again
      setTimeout(async () => {
        console.log('Auto-checking permissions after opening settings...');
        await verifyPermissions();
      }, 1000);
    } catch (error) {
      console.error('Error opening settings:', error);
    }
  };

  const verifyPermissions = async () => {
    try {
      console.log('=== Verifying permissions ===');
      const cameraStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      // Check both FINE and COARSE location permissions
      const fineLocationStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const coarseLocationStatus = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );

      // Accept either fine or coarse location
      const locationStatus = fineLocationStatus || coarseLocationStatus;

      console.log(
        'Camera permission status:',
        cameraStatus,
        typeof cameraStatus,
      );
      console.log(
        'Fine Location permission status:',
        fineLocationStatus,
        typeof fineLocationStatus,
      );
      console.log(
        'Coarse Location permission status:',
        coarseLocationStatus,
        typeof coarseLocationStatus,
      );
      console.log('Location status (either):', locationStatus);
      console.log('Both granted?', cameraStatus && locationStatus);

      if (cameraStatus === true && locationStatus === true) {
        console.log('✓ All permissions granted - opening app');
        setPermissionsGranted(true);
        setShowPermissionModal(false);
      } else {
        console.log('✗ Permissions not granted - showing modal');
        console.log('Camera:', cameraStatus ? 'GRANTED' : 'DENIED');
        console.log('Location:', locationStatus ? 'GRANTED' : 'DENIED');
        setPermissionsGranted(false);
        setShowPermissionModal(true);
      }
    } catch (error) {
      console.error('Permission verification error:', error);
      setPermissionsGranted(false);
      setShowPermissionModal(true);
    }
  };

  if (loading) {
    return (
      <Image
        source={launch_splash}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
        }}
      />
    );
  }

  // if (!permissionsGranted && !loading) {
  //   return (
  //     <View style={styles.container}>
  //       <Modal
  //         visible={true}
  //         transparent={true}
  //         animationType="fade"
  //         onRequestClose={() => {}}
  //         hardwareAccelerated={true}
  //       >
  //         <View style={styles.modalContainer}>
  //           <View style={styles.modalContent}>
  //             <Text style={styles.modalTitle}>⚠️ Permissions Required</Text>
  //             <Text style={styles.modalMessage}>
  //               This app requires Camera and Location permissions to function.
  //             </Text>
  //             <Text style={styles.modalSubMessage}>
  //               Click below to open Settings and enable Camera and Location
  //               permissions for this app.
  //             </Text>
  //             <View style={styles.buttonContainer}>
  //               <TouchableOpacity
  //                 style={styles.allowButton}
  //                 onPress={handleRequestPermissions}
  //               >
  //                 <Text style={styles.buttonText}>Open Settings</Text>
  //               </TouchableOpacity>
  //               {/* <TouchableOpacity
  //                   style={[
  //                     styles.allowButton,
  //                     {backgroundColor: '#34C759', marginTop: 10},
  //                   ]}
  //                   onPress={verifyPermissions}>
  //                   <Text style={styles.buttonText}>Check Permissions</Text>
  //                 </TouchableOpacity> */}
  //             </View>
  //           </View>
  //         </View>
  //       </Modal>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      <DismissKeyboard>
        <QueryClientProvider client={queryClient}>
          <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
          <Navigation />
        </QueryClientProvider>
      </DismissKeyboard>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#FF3B30',
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
    fontWeight: '600',
  },
  modalSubMessage: {
    fontSize: 14,
    marginBottom: 25,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
  },
  allowButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
