import React, { useRef, ReactNode, useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  GestureResponderEvent,
  ViewStyle,
  StatusBar,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Animation, CustomAnimation } from 'react-native-animatable'

const COVER_BOTTOMSHEET_ZINDEX = 101

interface IBackdropAnimation {
  fadeIn: CustomAnimation
  fadeOut: CustomAnimation
}

interface IReactNativeModalView {
  animationIn?: Animation
  animationInTiming?: number
  animationOut?: Animation
  animationOutTiming?: number
  backdropStyle?: ViewStyle
  children: ReactNode
  hasBackdrop: boolean,
  isVisible: boolean
  modalStyle?: ViewStyle | null
  onBackdropPress?: (event: GestureResponderEvent) => void
  onModalShow?: () => void
  onModalWillShow?: () => void
  onModalHide?: () => void
  onModalWillHide?: () => void
}

const backdropAnimation: IBackdropAnimation = {
  fadeIn: {
    0: { backgroundColor: 'rgba(0, 0, 0, 0)' },
    0.3: { backgroundColor: 'rgba(0, 0, 0, .4)' },
    1: { backgroundColor: 'rgba(0, 0, 0, .6)' },
  },
  fadeOut: {
    0: { backgroundColor: 'rgba(0, 0, 0, .6)' },
    1: { backgroundColor: 'rgba(0, 0, 0, 0)' },
  },
}

const ReactNativeModalView: React.FC<IReactNativeModalView> = ({
  animationIn,
  animationInTiming,
  animationOut,
  animationOutTiming,
  backdropStyle,
  children,
  hasBackdrop,
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
    animatedViewRef.current?.animate(animationIn, animationInTiming).then(() => {
      onModalShow?.()
    })
  }

  const animateOut = () => {
    animatedViewRef.current?.animate(animationOut, animationOutTiming).then(() => {
      onModalHide?.()
      setIsShow(false)
    })
    if(hasBackdrop) backdropRef.current?.animate(backdropAnimation.fadeOut)
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
  }, [animatedViewRef, backdropRef, isVisible])

  if (!isShow) return <View />

  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      <Animatable.View
        ref={backdropRef}
        animation={hasBackdrop ? backdropAnimation.fadeIn : undefined}
        style={hasBackdrop ? [backdropStyle || styles.backdrop] : [styles.backdrop, {backgroundColor: 'rgba(0,0,0,0)'}]}
      >
        <StatusBar barStyle="light-content" />
        <TouchableWithoutFeedback>
          <View style={[modalStyle || styles.modal]}>
            <Animatable.View
              ref={animatedViewRef}
              animation={animationIn}
              direction="alternate"
              duration={500}
              style={[styles.modalView]}
            >
              {children}
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
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
  hasBackdrop: true,
}

export default ReactNativeModalView
