import { View, Text, ScrollView, StyleSheet, FlatList, RefreshControl } from "react-native";
import Avatar from "../components/avatar.component";
import Colors from "../constants/colors.constant";
import { RFValue } from "react-native-responsive-fontsize";
import dados from '../../fakedata.json';
import Input from "../components/input.component";
import { useState } from "react";
import ButtonIcon from "../components/button.icon.component";
import Button from "../components/button.component";
import ModalInput from "../components/modal.client.component";
import { FloatingAction } from "react-native-floating-action";
import FoatingButton from "../components/floating.button.component";

interface ItemProps {
    id: string;
    title: string;
    date: string;
}

export default function Cliente() {
    let [clinte, setCliente] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    let [refreshing, setRefreshing] = useState<boolean>(false);

    function close() {
        setModalVisible(false);
    }

    const Item = ({ id, title, date }: ItemProps) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.textDate}>
                    {new Date(date).toLocaleDateString()}
                </Text>
            </View>
            <View>
                <Button
                    color={Colors.primary}
                    title="Ver mais"
                    onPress={() => {
                        setSelectedClientId(id);
                        setModalVisible(true);
                    }}
                />
            </View>
        </View>
    );

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }

    return (
        <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.header}>
                <View style={styles.headerConteudo}>
                    <Text style={styles.inicioText}>Clientes</Text>
                    <Avatar name="Rodrigo Froes" size={40} />
                </View>
                <View style={styles.headerValor}>
                    <View style={styles.totalContainer}>
                        <Text style={styles.total}>Total</Text>
                    </View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.valor}>
                            {dados.clintes.total}
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.headerInput}>
                        <View style={styles.inputContainer}>
                            <Input placeholder="Procurar clientes..." value={clinte} onChange={setCliente} isSerch={true} />
                        </View>
                        <View style={styles.button}>
                            <ButtonIcon color={Colors.offWhite} icon="filter" onPress={() => { }} size={30} />
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
            <View style={styles.list}>
                <FlatList
                    data={dados.clintes.lista}
                    renderItem={({ item }) => <Item
                        id={item.id.toString()}
                        title={item.nome.toString()}
                        date={item.data.toString()}
                    />}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
            <View style={styles.floating}>
                <FoatingButton onTrashPress={() => {}}  onPress={() => { }} style={{ Button: 100 }} />
            </View>
            <ModalInput id={selectedClientId} modalVisible={modalVisible} close={close} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 16,
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
    headerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    inputContainer: {
        flex: 1,
        marginRight: 10,
    },
    button: {
        marginTop: 30,
    },
    atualizacao: {
        marginTop: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    atualizacaoText: {
        color: Colors.offWhite,
        fontSize: RFValue(12),
    },
    list: {
        flex: 1,
        backgroundColor: Colors.offWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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
    floating: {
        position: 'absolute',
        bottom: 70,
        right: 40,
    },
})