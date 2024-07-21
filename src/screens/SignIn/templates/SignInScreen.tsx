import React, { useMemo, useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'

import * as ThingsAPI from '../../../api/index'
import TextInputComp from '../../../@common/components/TextInputComp'
import ButtonComp from '../../../@common/components/ButtonComp'
import CloseButton from '../../../@common/components/CloseButton'
import { accessTokenStorage, refreshTokenStorage, userIdStorage } from '../../../storage/secure'
import { setAxiosHeaders } from '../../../api/thingsAxios'

function SignInScreen(props) {
  const { bottomSheetModalRef } = props
  const { push } = useNavigation()

  const [idValue, setIdValue] = useState<string>('')
  const [passwordValue, setPasswordValue] = useState<string>('')

  const snapPoints = useMemo(() => ['70%'], [])

  async function onSignIn() {
    const res = await ThingsAPI.postSignIn({ id: idValue, password: passwordValue })
    if (res?.data?.accessToken) {
      bottomSheetModalRef.current?.dismiss()
      setAxiosHeaders(res?.data?.accessToken)
      await accessTokenStorage.set(res?.data?.accessToken)
      await refreshTokenStorage.set(res?.data?.accessToken)
      await userIdStorage.set(idValue)
      push('BottomTabNavigator', { screen: 'Home' })
    } else {
      Alert.alert(res?.data?.message, '', [{}])
    }
  }

  return (
    <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
      <BottomSheetView>
        <View style={{ paddingHorizontal: 40, paddingVertical: 20 }}>
          <View style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
            <CloseButton
              onPress={() => {
                bottomSheetModalRef.current?.dismiss()
              }}
            />
          </View>
          <View style={{ alignItems: 'center', marginBottom: 40 }}>
            <Text style={{ fontSize: 28, color: 'black' }}>LOGIN</Text>
          </View>
          <View style={{ gap: 20 }}>
            <TextInputComp placeholder="로그인 아이디..." value={idValue} setValue={setIdValue} />
            <TextInputComp placeholder="패스워드..." value={passwordValue} setValue={setPasswordValue} />
            <ButtonComp
              text={'로그인'}
              func={() => {
                onSignIn()
              }}
            />
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

export default SignInScreen
