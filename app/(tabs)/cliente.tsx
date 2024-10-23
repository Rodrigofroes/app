import { View, Text, StyleSheet, FlatList, RefreshControl } from "react-native";
import Checkbox from 'expo-checkbox';
import Avatar from "../components/avatar.component";
import Colors from "../constants/colors.constant";
import { RFValue } from "react-native-responsive-fontsize";
import dados from '../../fakedata.json';
import Input from "../components/input.component";
import { useState, useEffect } from "react";
import ButtonIcon from "../components/button.icon.component";
import Button from "../components/button.component";
import ModalInput from "../components/modal.client.component";
import FoatingButton from "../components/floating.button.component";
import { Ionicons } from "@expo/vector-icons";

interface ItemProps {
    id: string;
    title: string;
    date: string;
    onCheckChange?: (id: string, value: boolean) => void;
    checked?: boolean;
    isTrash?: boolean;
}

export default function Cliente() {
    const [clinte, setCliente] = useState<string>('');
    const [filteredClientes, setFilteredClientes] = useState(dados.clintes.lista);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isTrash, setIsTrash] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState<any>({});

    function close() {
        setModalVisible(false);
    }

    const Item = ({ id, title, isTrash, date, onCheckChange, checked }: ItemProps) => (
        <View style={styles.item}>
            <View>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.textDate}>
                        {new Date(date).toLocaleDateString()}
                    </Text>
                </View>
            </View>
            <View>
                {isTrash ? (
                    <Checkbox
                        value={checked}
                        color={Colors.primary}
                        onValueChange={(newValue) => onCheckChange(id, newValue)}
                    />
                ) : (
                    <Button
                        title="Detalhes"
                        onPress={() => {
                            setModalVisible(true);
                            setSelectedClientId(id);
                        }}
                    />
                )}
            </View>
        </View>
    );

    const pesquisarCliente = (text: string) => {
        const lista = dados.clintes.lista;
        const filteredList = lista.filter((cliente) => {
            return cliente.nome.toLowerCase().includes(text.toLowerCase());
        });

        if (text.length === 0) {
            setFilteredClientes(lista);
        }

        setFilteredClientes(filteredList);
    };

    useEffect(() => {
        pesquisarCliente(clinte);
    }, [clinte]);


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const handleCheckChange = (id: string, newValue: boolean) => {
        setCheckedItems((prevCheckedItems: any) => {
            const updatedItems = { ...prevCheckedItems };

            if (newValue) {
                updatedItems[id] = true;
            } else {
                delete updatedItems[id];
            }

            console.log(updatedItems);
            return updatedItems;
        });
    };

    function deletarCliente() {
        setIsTrash(true);

        if (Object.keys(checkedItems).length === 0) return;

        const lista = dados.clintes.lista;
        const filteredList = lista.filter((cliente) => !checkedItems[cliente.id]);

        setFilteredClientes(filteredList);
        setCheckedItems({});
        setIsTrash(false);
    }

    function adicionarCliente(){
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
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
                            <Input
                                placeholder="Procurar clientes..."
                                value={clinte}
                                onChange={setCliente}
                            />
                        </View>
                        <View style={styles.button}>
                            <ButtonIcon
                                color={Colors.offWhite}
                                icon="filter"
                                onPress={() => { pesquisarCliente(clinte) }}
                                size={30}
                            />
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
            <View style={styles.listContainer}>
                {
                    filteredClientes.length > 0 ? (
                        <FlatList
                            data={filteredClientes}
                            renderItem={({ item }) => (
                                <Item
                                    key={item.id}
                                    id={item.id}
                                    title={item.nome}
                                    date={item.data}
                                    isTrash={isTrash}
                                    checked={checkedItems[item.id] || false}
                                    onCheckChange={handleCheckChange}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        />
                    ) : (
                        <View style={styles.noClientsContainer}>
                            <Ionicons name="sad-outline" size={50} color={Colors.blackInput} />
                            <Text style={styles.noClientsText}>Nenhum cliente encontrado</Text>
                        </View>
                    )
                }
                <FoatingButton
                    onAddClient={adicionarCliente}
                    onTrashPress={deletarCliente}
                    isTrashOpen={isTrash}
                />
            </View>
            {modalVisible && (
                <ModalInput
                    key={selectedClientId}
                    id={selectedClientId?.toString() || ''}
                    close={close}
                    modalVisible={modalVisible}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 16,
        paddingBottom: 30,
        zIndex: 1,
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
    floatingButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    listContainer: {
        flex: 1,
        backgroundColor: Colors.offWhite,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    noClientsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    noClientsText: {
        fontSize: RFValue(16),
        color: Colors.blackInput,
        marginTop: 10,
        textAlign: 'center',
    },
});
