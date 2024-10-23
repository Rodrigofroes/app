import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text, SafeAreaView, ScrollView } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { RFValue } from 'react-native-responsive-fontsize';
import Colors from '../constants/colors.constant';

const { width } = Dimensions.get('window');

export default function ChartPie() {
    const widthAndHeight = width - 200;

    const [porcentagem, setPorcentagem] = useState<string[]>([]);

    const series = [
        {
            value: 50,
            label: 'Comida',
            color: '#fbd203'
        },
        {
            value: 40,
            label: 'Transporte',
            color: '#ffb300'
        },
        {
            value: 10,
            label: 'Lazer',
            color: "#ff9100"
        },
        {
            value: 5,
            label: 'Outros',
            color: "#ff6c00"
        },
        {
            value: 5,
            label: 'Outros',
            color: "#ff3c00"
        }
    ];

    useEffect(() => {
        calcularPorcentagem();
    }, []);

    function calcularPorcentagem() {
        const soma = series.reduce((a, b) => a + b.value, 0);
        const porcentagemFormat = series.map(item => ((item.value * 100) / soma).toFixed(2));
        setPorcentagem(porcentagemFormat);
    }

    function legend() {
        return (
            <View style={styles.legendContainer}>
                {series.map((item, index) => (
                    <Text key={index} style={styles.legendText}>
                        <Text style={{ color: item.color }}>■</Text> {item.label}: {porcentagem[index]}%{"\n"}
                    </Text>
                ))}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <PieChart
                        widthAndHeight={widthAndHeight}
                        series={series.map(item => item.value)}
                        sliceColor={series.map(item => item.color)}
                    />
                    <View>
                        {legend()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.offWhite,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    legendContainer: {
        marginTop: 20,
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 5
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendText: {
        fontSize: RFValue(14),
        marginVertical: 2,
    },
});
