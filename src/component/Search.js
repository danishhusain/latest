// import { StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { useState } from 'react'

// const Search = () => {
//     const [query, setQuery] = useState('')
//     const fruits = ["Banana", "Orange", "Apple", "Mango"];


//     const searchJob = (text) => {
//         const filterData = fruits.includes(text);
//         console.log("filterData", filterData)
//     }


//     console.log("Search", query)
//     return (
//         <View>
//             <TextInput
//                 placeholder='search Job'
//                 // onChangeText={(text) => setQuery(text)}
//                 onChangeText={(text) => { searchJob(text), setQuery(text) }}
//                 value={query}
//                 style={styles.textInput}
//             // editable={false}
//             />
//         </View>
//     )
// }

// export default Search

// const styles = StyleSheet.create({
//     textInput: {
//         borderWidth: 1,
//         marginHorizontal: 16,
//         marginVertical: 8,
//         borderRadius: 8,
//         paddingHorizontal: 16
//     }
// })











////////////////////
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'




const SearchItems = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const Search = ({ route }) => {
    const [query, setQuery] = useState('')
    const [filterData, setFilterData] = useState([])


    useEffect(() => {
        if (query.length == 1) {
            setFilterData([])
        }
    }, [query])




    const searchJobTest = (text) => {
        const filteredData = route?.params?.data?.filter((item) => Object.values(item).join('').toLowerCase().includes(text.toLowerCase()))
        setFilterData(filteredData)
    }


    return (
        <View>
            <TextInput
                placeholder='Search Job'
                onChangeText={(text) => { searchJobTest(text), setQuery(text) }}
                value={query}
                style={styles.textInput}
                autoFocus={true}
            />
            <FlatList
                data={query.length == 1 ? [] : filterData || []}
                renderItem={({ item }) => <SearchItems title={item.title} />}
                keyExtractor={(item, index) => item.id || index}
            />
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        paddingHorizontal: 16
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
        // fontSize: 24,
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
})