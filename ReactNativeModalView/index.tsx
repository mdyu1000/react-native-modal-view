import React, { useRef, ReactNode, useState, useEffect } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, GestureResponderEvent, ViewStyle, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Animation, CustomAnimation } from 'react-native-animatable'

const COVER_BOTTOMSHEET_ZINDEX = 101

interface IBackdropAnimation {
  fadeIn: CustomAnimation;
  fadeOut: CustomAnimation;
}

const backdropAnimation: IBackdropAnimation = {
  fadeIn: {
    0: { backgroundColor: 'rgba(0, 0, 0, 0)' },
    0.3: { backgroundColor: 'rgba(0, 0, 0, .4)' },
    1: { backgroundColor: 'rgba(0, 0, 0, .6)' }
  },
  fadeOut: {
    0: { backgroundColor: 'rgba(0, 0, 0, .6)' },
    1: { backgroundColor: 'rgba(0, 0, 0, 0)' }
  }
}

const ReactNativeModalView: React.FC<{
  animationIn?: Animation,
  animationInTiming?: number,
  animationOut?: Animation,
  animationOutTiming?: number,
  backdropStyle?: ViewStyle
  children: ReactNode
  isVisible: boolean
  modalStyle?: ViewStyle | null
  onBackdropPress?: (event: GestureResponderEvent) => void
  onModalShow?: () => void
  onModalWillShow?: () => void
  onModalHide?: () => void
  onModalWillHide?: () => void
}> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropStyle,
  children,
  isVisible,
  modalStyle,
  onBackdropPress,
  onModalShow,
  onModalWillShow,
  onModalHide,
  onModalWillHide,
}) => {
  const animatedViewRef = useRef<any>(null)
  const backdropRef = useRef<any>(null)
  const [isShow, setIsShow] = useState(isVisible)

  const animateIn = () => {
    animatedViewRef.current
      ?.animate(animationIn, animationInTiming)
      .then(() => {
        onModalShow?.()
      })
  }

  const animateOut = () => {
    animatedViewRef.current
      ?.animate(animationOut, animationOutTiming)
      .then(() => {
        onModalHide?.()
        setIsShow(false)
      })
    backdropRef.current
      ?.animate(backdropAnimation.fadeOut)
  }

  useEffect(() => {
    if (isVisible) {      
      onModalWillShow?.()
      animateIn()
      setIsShow(true)
    } else {
      onModalWillHide?.()
      animateOut()
    }
  }, [isVisible, animatedViewRef, backdropRef])

  if (!isShow) return <View />

  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      <Animatable.View ref={backdropRef} animation={backdropAnimation.fadeIn} style={[backdropStyle || styles.backdrop]}>
        <StatusBar barStyle="light-content" />
        <View style={[modalStyle || styles.modal]}>
          <Animatable.View
            ref={animatedViewRef}
            animation={animationIn}
            direction="alternate"
            duration={500}
            style={[styles.modalView]}
            pointerEvents="box-only"
          >
            {children}
          </Animatable.View>
        </View>
      </Animatable.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
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
    borderRadius: 2,
    padding: 24,
  },
})

ReactNativeModalView.defaultProps = {
  animationIn: 'fadeInUp',
  animationOut: 'fadeOutDown',
}

export default ReactNativeModalView
