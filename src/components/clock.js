

import { Text, View, StyleSheet, Button } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { useCallback, useEffect, useState } from "react";


export default function Clock({ route }){

  const valorClock = route.params

  return(
    <CountdownCircleTimer
        duration={25}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[10, 6, 3, 0]}
        onComplete={() => ({ shouldRepeat: true, delay: 2 })}
        updateInterval={1}
    >
      {({ remainingTime, color }) => (
        <Text style={{ color, fontSize: 40 }}>
          {remainingTime}
        </Text>
      )}
    </CountdownCircleTimer>
  )
}