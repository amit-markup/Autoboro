import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Button,
    TextInput
} from 'react-native';
import { RadioButton } from 'react-native-paper';

//This class render the whole list of products
// var List = React.createClass({
//     render() {
//         let itemsToDisplay = this.props.items.map(i => {
//             return (<ListItem id={i.id} item={i.item} vote={i.vote} place={i.place} voted={i.voted} display={i.display} updateMark={() => this.props.updateMark(i.id)} />);
//         });
//         return (
//             <ul>
//                 {itemsToDisplay}
//             </ul>
//         );
//     }
// });


class List extends React.Component {
    render() {
        let itemsToDisplay = this.props.items.map(i => {
            return (<ListItem id={i.id} item={i.item}  updateMark={() => this.props.updateMark(i.id)} />);
        });
        return (
            <View>
            <Text>{itemsToDisplay}</Text>
            </View>
        )
    }
}

//This class render a component from the list
// var ListItem = React.createClass({
//     render() {
//         return (
//             <li id={this.props.id} className={this.props.display ? 'itemShow' : 'itemHide'}>
//                 <div className='itemPresentation'>
//                     <h2>{this.props.item}</h2>
//                     <p>{this.props.place}</p>
//                 </div>
//                 <div className='itemDetail'>
//                     <p>{this.props.vote} <i className="fa fa-thumbs-up" aria-hidden="true" /></p>
//                 </div>
//                 <button onClick={() => this.props.updateMark()}>{this.props.voted ? <i className="fa fa-thumbs-up" aria-hidden="true" /> : <i className="fa fa-thumbs-o-up" aria-hidden="true" />}</button>
//             </li>
//         );
//     }

// });

class ListItem extends React.Component {
    render() {
        return (
            <View id={this.props.id} >
                <View style={{flexDirection:'row'}}>
                    <Text style={{color:'black'}}>{this.props.item}</Text>
                    <Text style={{color:'black'}}>{this.props.place}</Text>
                </View>
                <View>
                    <Text style={{color:'black'}}>{this.props.vote}</Text>
                </View>
                <Button onPress={() => this.props.updateMark()} title="hello" />
            </View>
        )
    }
}

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { id: 1, item: 'Baguette', place: 'Paris, FR', vote: 150, voted: false, display: true },
                { id: 2, item: 'Quiche Lorraine', place: 'Nancy, FR', vote: 200, voted: true, display: true },
                { id: 3, item: 'Croissant', place: 'London, UK', vote: 50, voted: false, display: true },
                { id: 4, item: 'Quiche', place: 'NYC, USA', vote: 20, voted: false, display: true },
                { id: 5, item: 'Quiche', place: 'Singapore, SGP', vote: 10, voted: false, display: true },
                { id: 6, item: 'Croissant', place: 'Singapore, SGP', vote: 10, voted: false, display: true },
                { id: 7, item: 'Quiche', place: 'Barcelona, SP', vote: 0, voted: false, display: true },
                { id: 8, item: 'Quiche', place: 'Paris, FR', vote: 149, voted: false, display: true },
                { id: 9, item: 'Macarons', place: 'Nancy, FR', vote: 201, voted: false, display: true },
                { id: 10, item: 'Tart', place: 'Barcelona, SP', vote: 3, voted: false, display: true },
            ],
            filterShow: false,
            filter: ''
        }
    }

    //show or hide the filters section
    expendFilters(event) {
        this.setState({ items: this.state.items, filterShow: !this.state.filterShow, filter: '' });
    }

    //this update the state with the selected filter to order the list
    handleChange(value) {
        console.log(value)
        this.setState({ items: this.state.items, filterShow: this.state.filterShow, filter: value })
    }

    //this handle the sorting of the list. I t will depend on the filter we choose.
    sortResults() {
        const filter = this.state.filter;
        let newTab = this.state.items.slice();
        if (this.state.filter === 'vote') {
            newTab.sort(function (a, b) { return (b.vote) - (a.vote); });
        } else if (this.state.filter === 'city') {
            newTab.sort(function (a, b) {
                if (a.place < b.place) return -1;
                if (a.place > b.place) return 1;
                return 0;
            });
        } else if (this.state.filter === 'product') {
            newTab.sort(function (a, b) {
                if (a.item < b.item) return -1;
                if (a.item > b.item) return 1;
                return 0;
            });
        }
        if (filter === '') {
            this.setState({ items: newTab, filterShow: this.state.filterShow, filter: this.state.filter });
        } else {
            this.setState({ items: newTab, filterShow: false, filter: this.state.filter });
        }

    }

    //this function handles the vote. We can only vote once for a product. This will reorder the list if a filter is in the state.
    updateMark(id) {
        let newItem = this.state.items.slice();
        const index = newItem.findIndex(i => i.id === id);
        if (newItem[index].voted) {
            newItem[index].vote -= 1;
        } else {
            newItem[index].vote += 1;
        }
        newItem[index].voted = !this.state.items[index].voted;
        this.setState({ items: newItem, filterShow: this.state.filterShow, filter: this.state.filter });
        this.sortResults();
    }

    render() {
        // let itemsToDisplay = this.props.items.map(i => {
        //     return (<ListItem id={i.id} item={i.item}  updateMark={() => this.props.updateMark(i.id)} />);
        // });
        return (
            <View>
                <View style={{flexDirection:'row'}}>
                    <TextInput placeholder='Search...' onChangeText={() => this.onChange()} style={{ height: 40, width:300, borderColor: 'gray', borderWidth: 1 }} />
                    <Button onPress={(event) => this.expendFilters(event)} title="icon" />
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={{ flexDirection: 'row', marginTop: 10, width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                  <RadioButton.Group
                   >
                    <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Roboto_Regular' }}>New Part</Text>
                    <RadioButton value="new" color={"#FF0000"} uncheckedColor={'#000000'} onPress={(event) => this.handleChange(event.target.value)} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Roboto_Regular' }}>Use Part</Text>
                    <RadioButton value="used" color={"#FF0000"} uncheckedColor={'#000000'} onPress={(event) => this.handleChange(event.target.value)} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'Roboto_Regular' }}>New & Use Part</Text>
                    <RadioButton value="both" color={"#FF0000"} uncheckedColor={'#000000'} onPress={(event) => this.handleChange(event.target.value)} />
                  </View>
                    {/* {businessTypeRadio} */}
                  </RadioButton.Group>
                </View>
                    <Button title='Sort' onPress={() => this.sortResults()} />
                </View>

               { this.state.items.map(i => {
                   <ListItem id={i.id} item={i.item} updateMark={() => this.props.updateMark(i.id)} />
                })}
            </View>
        );
    }
}
