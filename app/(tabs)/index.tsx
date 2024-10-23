import { View, Text, StyleSheet, Dimensions, RefreshControl, FlatList, ScrollView } from "react-native";
import Avatar from "../components/avatar.component";
import Colors from "../constants/colors.constant";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState } from "react";
import data from '../../fakedata.json';
import formatCurrency from "../utils/format.currency";
import ChartPie from "../components/chart.pie.component";

const { width } = Dimensions.get('window');

interface ItemProps {
    title: string;
    date: string;
    valor: number;
}

const Item = ({ title, date, valor }: ItemProps) => (
    <View style={styles.item}>
        <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.textDate}>
                {
                    new Date(date).toLocaleDateString()
                }
            </Text>
        </View>
        <View>
            <Text style={styles.title}>{formatCurrency(valor)}</Text>
        </View>
    </View>
);

export default function Home() {
    let [refreshing, setRefreshing] = useState<boolean>(false);
    let [dados, setDados] = useState(data);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerConteudo}>
                    <Text style={styles.inicioText}>Inicio</Text>
                    <Avatar name="Rodrigo Froes" size={40} onPress={() => { }} />
                </View>
                <View style={styles.headerValor}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>Total</Text>
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.valor}>
                            {formatCurrency(dados.home[0].total)}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Ionicons name="caret-up-outline" size={24} color={Colors.offWhite} />
                        <View>
                            <Text style={styles.cardText}>Entradas</Text>
                            <Text style={styles.cardValue}>
                                {formatCurrency(dados.entrada[0].total)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Ionicons name="caret-down-outline" size={24} color={Colors.offWhite} />
                        <View>
                            <Text style={styles.cardText}>Despesas</Text>
                            <Text style={styles.cardValue}>
                                {formatCurrency(dados.saida[0].total)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.atualizacao}>
                    <Text style={styles.atualizacaoText}>
                        Última atualização às
                    </Text>
                    <Text style={styles.atualizacaoText}>
                        {new Date().toLocaleTimeString()}
                    </Text>
                </View>
            </View>


            <View style={styles.corpoPie}>
                <View style={styles.corpoText}>
                    <Text style={styles.grafTitulo}>Gráfico detalhado</Text>
                    <Text>Úlitmos 7 dias</Text>
                </View>
                <ChartPie />
            </View>

            <View style={styles.corpo}>
                <View style={styles.corpoText}>
                    <Text style={styles.grafTitulo}>Últimos lançamentos</Text>
                </View>
                <FlatList
                    data={dados.lista}
                    renderItem={({ item }) => <Item
                        title={item.descricao.toString()}
                        date={item.data.toString()}
                        valor={item.valor}
                    />}
                    keyExtractor={item => item.id.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    style={{ flexGrow: 1 }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.offWhite,
    },
    header: {
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 13,
    },
    headerConteudo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
    inicioText: {
        color: Colors.offWhite,
        fontSize: RFValue(16),
    },
    headerValor: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    total: {
        color: Colors.offWhite,
        fontSize: RFValue(16),
        fontWeight: '600',
    },
    valor: {
        color: Colors.offWhite,
        fontSize: RFValue(24),
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 10,
        width: width * 0.4,
        justifyContent: 'space-around',
    },
    cardText: {
        color: Colors.offWhite,
        fontSize: RFValue(14),
        fontWeight: '600',
    },
    cardValue: {
        color: Colors.offWhite,
        fontSize: RFValue(16),
    },
    atualizacao: {
        marginTop: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    atualizacaoText: {
        color: Colors.offWhite,
        fontSize: RFValue(12),
    },
    corpo: {
        backgroundColor: Colors.offWhite,
        paddingHorizontal: 5,
        paddingVertical: 10,
        flex: 1,
    },
    corpoText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    grafTitulo: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: Colors.grayList,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    textDate: {
        fontSize: RFValue(12),
    },
    corpoPie: {
        backgroundColor: Colors.offWhite,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 2,
    }
});
