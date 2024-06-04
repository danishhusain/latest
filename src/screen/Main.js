

// import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import axios, { Axios } from 'axios'



// const RenderData = ({ item }) => {
//   <View style={{ flex: 1, backgroundColor: 'green' }}>
//     <Text>hi</Text>
//   </View>

// }

// const Item = ({ title }) => (
//   <View style={styles.item}>
//     <Text style={styles.title}>title</Text>
//   </View>
// );

// const Main = () => {
//   const URL = 'https://94cd0440-3128-49eb-a37e-49db4ead7208.mock.pstmn.io/jobs?page=1'
//   const [data, setData] = useState([])

//   useEffect(() => {
//     getAPi()
//   }, [])

//   const getAPi = async () => {
//     try {
//       const resp = await axios.get(URL)
//       setData(resp?.data)
//       // console.log("api", resp?.data)
//     } catch (error) {
//       console.log("error", error)

//     }
//   }



//   console.log("data", data)
//   return (
//     <SafeAreaView style={styles.container}>

//       {
//         data?.length > 0 ?
//           <>
//             <FlatList
//               data={data}
//               // keyExtractor={(item, index) => index}
//               keyExtractor={({ item, index }) => index}

//               // renderItem={({ item }) => <RenderData data={item} />}
//               renderItem={({ item }) => <Item title={item.title} />}
//               contentContainerStyle={{ backgroundColor: 'blue' }}
//             />
//           </>
//           :
//           null
//       }

//     </SafeAreaView >
//   )
// }

// export default Main

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: 'red'
//   },
//   itemContainer: {
//     flex: 1,
//     backgroundColor: 'green'
//   },
// })






////////////
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    ActivityIndicator,
    TextInput,
    Pressable,
} from 'react-native';
import Search from '../component/Search';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];

const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}><Text style={styles.company}>Company Name: </Text>{title.company_name}</Text>
        <Text style={styles.title}><Text style={styles.company}>Title: </Text>{title.title}</Text>
        <Text style={styles.title}><Text style={styles.company}>Number: </Text>{title.whatsapp_no}</Text>
    </View>
);
const Header = () => (
    <View style={styles.header}>
        <Text style={styles.titleTitle}>New Jobs</Text>
    </View>
);
const Empty = () => (
    <View style={styles.empty}>
        <Text style={styles.titleEmpty}>No Available Jobs</Text>
    </View>
);
const Loder = () => (
    <View style={styles.empty}>
        <ActivityIndicator size={30} />
    </View>
);

const Main = () => {

    const URL = 'https://94cd0440-3128-49eb-a37e-49db4ead7208.mock.pstmn.io/jobs?page=1'
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('')
    const navigation = useNavigation()

    useEffect(() => {
        getAPi()
    }, [])

    const getAPi = async () => {
        setLoading(true)

        try {
            const resp = await axios.get(URL)
            setData(resp?.data?.results)
            setLoading(false)
        } catch (error) {
            console.log("error", error)
            setLoading(false)


        }
    }




    console.log("Main", query)
    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={() => navigation.navigate('Search', { data: data })}>
                <TextInput
                    placeholder='Search Job'
                    onChangeText={(text) => setQuery(text)}
                    value={query}
                    style={styles.textInput}
                    editable={false}
                />
            </Pressable>
            <FlatList
                data={data || []}
                renderItem={({ item }) => <Item title={item} />}
                keyExtractor={(item, index) => item.id || index}
                initialNumToRender={50}
                ListHeaderComponent={data?.length > 0 ? <Header /> : null}
                ListEmptyComponent={loading ? <Loder /> : <Empty />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 8,
    },
    item: {
        backgroundColor: '#ffff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 4
    },
    title: {
        fontSize: 16,
    },
    header: {
        marginHorizontal: 16
    },
    titleTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    titleEmpty: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000'
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        borderWidth: 1,
        marginHorizontal: 16,
        borderRadius: 8,
        paddingHorizontal: 16
    },
    company: {
        fontSize: 16, fontWeight: 'bold'
    }
});

export default Main;