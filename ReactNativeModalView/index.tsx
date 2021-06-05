import React, { useRef, ReactNode, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {AnimatableProperties} from 'react-native-animatable';

const COVER_BOTTOMSHEET_ZINDEX = 101

const ReactNativeModalView: React.FC<{
  isVisible: boolean;
  children: ReactNode
  modalStyle?: ViewStyle
  backdropStyle?: ViewStyle
  onBackdropPress?: (event: GestureResponderEvent) => void,
  onModalShow?: void,
  onModalHide?: void,
  onModalWillHide?: void,
}> = ({isVisible, children, modalStyle, backdropStyle, onBackdropPress, onModalShow, onModalHide, onModalWillHide}) => {
  const animatedViewRef = useRef<Animatable.View & View>(null)
  const [isShow, setIsShow] = useState(isVisible)

  useEffect(() => {
    if(isVisible && animatedViewRef.current){
      
    }
  }, [isVisible])

  if(!isVisible) return <View />

  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      <View style={[styles.backdrop, backdropStyle]}>
        <View style={[styles.modal, modalStyle]}>
          <Animatable.View
            ref={animatedViewRef}
            animation="fadeInUp"
            direction="alternate"
            duration={500}
            style={[styles.modalView]}
          >
            {children}
          </Animatable.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, .6)',
    zIndex: COVER_BOTTOMSHEET_ZINDEX,
    elevation: 13,
  },
  modal: {
    // Position Bottom
    // marginTop: 'auto',
    // Position Center
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 24,
    marginRight: 24,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    padding: 24
  },
})

export default ReactNativeModalView