import React, { useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, StatusBar, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view'

import CloseButton from '../../@common/components/CloseButton'
import QuoteMarkSvg from '../../assets/svgs/QuoteMarkSvg'
import PresentButton from './components/PresentButton'
import ActionButtons from './components/ActionButtons'

import * as ThingsAPI from '../../api/index'
import { useRoute } from '@react-navigation/native'
import { backgroundImages } from '../../assets/jsons/backgroundImage'

function DetailScreen() {
  const [data, setData] = useState([])
  const [isNext, setIsNext] = useState(true)
  const [paramIndex, setParamIndex] = useState(0)

  const route = useRoute()
  const params = route?.params?.params

  async function fetchQuotation() {
    const params = {
      page: 1,
      count: 20,
    }
    const res = await ThingsAPI.getQuotation(params)
    if (res) {
      setData(res?.data)
      setIsNext(false)
      // push('BottomTabNavigator', { screen: 'Home' })
    }
  }

  async function fetchQuotationId() {
    const res = await ThingsAPI.getQuotationId({ id: params })
    if (res) {
      setData([res?.data])
      setIsNext(false)
    }
  }

  useEffect(() => {
    if (!params) {
      fetchQuotation()
    }
  }, [])

  useEffect(() => {
    if (params) {
      setParamIndex(route?.params?.index)
      fetchQuotationId()
    }
  }, [params])

  function QuotationComp({ item, index }) {
    return (
      <ImageBackground
        style={{ width: '100%', height: '100%' }}
        source={backgroundImages[data.length === 1 ? paramIndex % 50 : index % 50].src}
        resizeMode="cover">
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, flex: 1 }}>
            <CloseButton />
            <View style={{ marginTop: '40%', marginLeft: 10 }}>
              <QuoteMarkSvg />
            </View>
            <View style={{ marginHorizontal: 40, marginTop: 15, backgroundColor: '#00000070' }}>
              <Text numberOfLines={7} style={{ fontSize: 20, color: 'white', lineHeight: 30, fontWeight: '600' }}>
                {item?.content}
              </Text>
            </View>
            <View style={{ marginHorizontal: 40, marginTop: 12, alignSelf: 'flex-end', backgroundColor: '#00000070' }}>
              <Text style={{ fontSize: 16, color: 'white', lineHeight: 20, fontWeight: '500' }}>
                - {item?.author?.name} -
              </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 35, right: 20, marginLeft: 20 }}>
              <ActionButtons item={item} />
            </View>
            <View style={{ position: 'absolute', bottom: 20, marginLeft: 20 }}>
              <PresentButton favoriteQuotation={item?.content} favoriteAuthor={item?.author?.name} />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <PagerView initialPage={0} orientation="vertical" style={{ flex: 1 }} useNext={isNext}>
        {data?.map((item, index) => {
          return <QuotationComp key={index} item={item} index={index} />
        })}
      </PagerView>
    </View>
  )
}

export default DetailScreen
