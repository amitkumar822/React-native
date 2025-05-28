import {
  View,
  Text,
  StyleSheet,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { screenHeight } from '@unistyles/Constants';
import { BlurView } from '@react-native-community/blur';
import Icon from '@components/global/Icon';

const CustomModal = forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [content, setContent] = useState(null);

  useImperativeHandle(ref, () => ({
    openModal: (data: any) => {
      setContent(data);
      setVisible(true);
    },
    closeModal: () => {
      setVisible(false);
    },
  }));

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <View style={styles.modalContainer}>
        {Platform.OS === 'ios' ? (
          <BlurView style={styles.blurBackground} blurType="light" blurAmount={10} />
        ) : (
          <View style={styles.androidBlurOverlay} />
        )}

        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setVisible(false)}>
            <Icon iconFamily="Ionicons" color="#fff" name="close" size={24} />
          </TouchableOpacity>

          {content ? (
            <View style={styles.modelContent}>{content}</View>
          ) : (
            <Text style={styles.placeholderText}>No Content Provided</Text>
          )}
        </View>
      </View>
    </Modal>

    // <Modal
    //   transparent
    //   visible={visible}
    //   animationType="slide"
    //   onRequestClose={() => setVisible(false)}>
    //   {Platform.OS === 'ios' && (
    //     <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
    //   )}

    //   <View style={styles.modalContainer}>
    //     <View style={styles.contentContainer}>
    //       <TouchableOpacity
    //         style={styles.closeIcon}
    //         onPress={() => setVisible(false)}>
    //         <Icon iconFamily="Ionicons" color="#fff" name="close" size={24} />
    //       </TouchableOpacity>

    //       {content ? (
    //         <View style={styles.modelContent}>{content}</View>
    //       ) : (
    //         <Text style={styles.placeholderText}>No Content Provided</Text>
    //       )}
    //     </View>
    //   </View>
    // </Modal>
  );
});

export default CustomModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  androidBlurOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 16,
    maxHeight: screenHeight * 0.7,
    minHeight: 150,
  },
  modelContent: {
    width: '100%',
  },
  closeIcon: {
    position: 'absolute',
    top: -60,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 200,
    padding: 10,
    zIndex: 1,
  },
  placeholderText: {
    textAlign: 'center',
    color: '#666',
    fontFamily: 'Okra-Medium',
    marginTop: 20,
  },
});


// const styles = StyleSheet.create({
//   modelContent: {
//     borderTopRightRadius: 10,
//     borderTopLeftRadius: 10,
//     overflow: 'hidden',
//     borderColor: '#fff',
//     maxHeight: screenHeight * 0.7,
//     minHeight: 150,
//     width: '100%',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     filter: Platform.OS === 'android' ? [{ blur: 4 }] : undefined,
//     justifyContent: 'flex-end',
//     color: '#fff'
//   },
//   contentContainer: {
//     width: '100%',
//     maxHeight: screenHeight * 0.7,
//     minHeight: 150,
//     borderRadius: 10,
//   },
//   placeholderText: {
//     textAlign: 'center',
//     color: '#666',
//     fontFamily: 'Okra-Medium',
//   },
//   closeIcon: {
//     position: 'absolute',
//     top: -60,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 200,
//     padding: 10,
//     zIndex: 1,
//   },
//   absolute: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   },
// });
