import React, { useEffect, useState } from 'react'
import { Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native'
import { Animation } from 'react-native-animatable'
import ReactNativeModalView from './ReactNativeModalView'

const ModalContent: React.FC = () => {
  return (
    <View>
      <Text style={[styles.title]}>Title</Text>
      <Text style={[styles.content]}>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.
      </Text>
    </View>
  )
}

const App = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [modalStyle, setModalStyle] = useState<ViewStyle | null>(null)
  const [animationIn, setAnimationIn] = useState<Animation>('fadeInUp')
  const [animationOut, setAnimationOut] = useState<Animation>('fadeOutDown')

  const toggleVisible = () => setIsVisible(!isVisible)

  const initModal = () => {
    setModalStyle(null)
    setAnimationIn('fadeInUp')
    setAnimationOut('fadeOutDown')
  }

  const handlePressDefault = () => {
    toggleVisible()
  }

  const handlePressBottom = () => {
    toggleVisible()
    setModalStyle({ marginTop: 'auto' })
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
        <ReactNativeModalView
          animationIn={animationIn}
          animationOut={animationOut}
          isVisible={isVisible}
          modalStyle={modalStyle}
          onBackdropPress={toggleVisible}
          onModalHide={initModal}
        >
          <ModalContent />
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
})

export default App
