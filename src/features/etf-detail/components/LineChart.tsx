import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LineChart from 'react-native-simple-line-chart';
import { LineChartComponentPoint } from '../model/LineChartPoint';
import { formatDate } from '~/lib/utils/formatDate';

interface LineChartComponentProps {
  data: LineChartComponentPoint[];
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  const screenWidth = Dimensions.get('window').width;
  const chartHeight = 240;
  const chartWidth = screenWidth - 64;

  if (data.length === 0) {
    return (
      <View style={{ height: chartHeight, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Aucune donnée disponible</Text>
      </View>
    );
  }

  const xAxisLabels = data
    .filter((_, index) => index % Math.max(1, Math.floor(data.length / 5)) === 0)
    .map((point) => formatDate(new Date(point.x), 'short'));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <View style={{ position: 'relative' }}>
          <LineChart
            lines={[
              {
                data,
                activePointConfig: {
                  color: '#3B82F6',
                  showVerticalLine: true,
                  verticalLineColor: '#E5E7EB',
                },
                lineColor: '#3B82F6',
                curve: 'linear',
                endPointConfig: {
                  color: '#3B82F6',
                  radius: 4,
                  animated: true,
                },
                activePointComponent: (point: any) => {
                  return (
                    <View
                      style={{
                        backgroundColor: '#3B82F6',
                        padding: 12,
                        borderRadius: 8,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                        {point?.extraData?.formattedValue}
                      </Text>
                      <Text style={{ color: 'white', fontSize: 10 }}>
                        {point?.extraData?.formattedTime}
                      </Text>
                    </View>
                  );
                },
              },
            ]}
            backgroundColor="transparent"
            height={chartHeight}
            width={chartWidth}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
            paddingHorizontal: 10,
          }}
        >
          {xAxisLabels.map((label, index) => (
            <Text key={index} style={{ fontSize: 10, color: '#6B7280' }}>
              {label}
            </Text>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};
