import React, { useEffect, useState } from 'react'
import { Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native'
import { Animation } from 'react-native-animatable'
import ReactNativeModalView from './ReactNativeModalView'

const App = () => {
  // Base Modal
  const [isVisible, setIsVisible] = useState(false)
  const [modalStyle, setModalStyle] = useState<ViewStyle | null>(null)
  const [animationIn, setAnimationIn] = useState<Animation>('fadeInUp')
  const [animationOut, setAnimationOut] = useState<Animation>('fadeOutDown')
  const [hasBackdrop, setHasBackdrop] = useState(true)
  // additional modal
  const [isVisible2, setIsVisible2] = useState(false)
  const [modalStyle2, setModalStyle2] = useState<ViewStyle | null>(null)
  //
  const toggleVisible = () => setIsVisible(!isVisible)

  const initModal = () => {
    setModalStyle(null)
    setAnimationIn('fadeInUp')
    setAnimationOut('fadeOutDown')
    setHasBackdrop(true)
  }

  const handlePressDefault = () => {
    toggleVisible()
  }

  const handlePressBottom = () => {
    toggleVisible()
    setModalStyle({ marginTop: 'auto' })
  }

  const handlePressBottomNoBackdrop = () => {
    toggleVisible()
    setModalStyle({
      marginTop: 'auto',
      shadowColor: '#063255',
      shadowOpacity: 0.3,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 15,
      elevation: 12,
    })
    setHasBackdrop(false)
  }

  const handlePressHorizontal = () => {
    toggleVisible()
    setAnimationIn('fadeInLeft')
    setAnimationOut('fadeOutRight')
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pressable style={[styles.button]} onPress={handlePressDefault}>
          <Text>Default</Text>
        </Pressable>
        <Pressable style={[styles.button]} onPress={handlePressBottom}>
          <Text>Bottom</Text>
        </Pressable>
        <Pressable style={[styles.button]} onPress={handlePressHorizontal}>
          <Text>Horizontal</Text>
        </Pressable>
        <Pressable style={[styles.button]} onPress={handlePressBottomNoBackdrop}>
          <Text>Bottom no backdrop</Text>
        </Pressable>
        <ReactNativeModalView
          animationIn={animationIn}
          animationOut={animationOut}
          hasBackdrop={hasBackdrop}
          isVisible={isVisible}
          modalStyle={modalStyle}
          onBackdropPress={toggleVisible}
          onModalHide={initModal}
        >
          <View>
            <Text style={[styles.title]}>Title</Text>
            <Text style={[styles.content]}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Text>
            <Pressable style={[styles.action]} onPress={toggleVisible}>
              <Text style={[styles.actionText]}>Confirm</Text>
            </Pressable>
          </View>
        </ReactNativeModalView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  content: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  action: {
    marginTop: 24,
    paddingVertical: 16,
    backgroundColor: 'black',
    borderRadius: 2,
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
})

export default App
