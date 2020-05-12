import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Button
} from 'react-native';


const PRODUCTS = [
    { category: "entertainment", name: "Football" },
    { category: "entertainment", name: "Baseball" },
    { category: "entertainment", name: "Basketball" },
    { category: "fashion", name: "iPod Touch" },
    { category: "design", name: "iPhone 5" },
    { category: "design", name: "Nexus 7" },
    { category: "leisure", name: "Holiday" }
];

// get unique category items
const uniqueItems = (x, i, array) => array.indexOf(x) === i;
const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.category).filter(
    uniqueItems
);

PRODUCT_CATEGORIES.push("all");
PRODUCT_CATEGORIES.sort();


const ProductItems = ({ state: { products, displayCategory } }) => (
    <View>
        {products
            .filter(
                ({ category }) =>
                    displayCategory === category || displayCategory === "all"
            )
            .map(({ category, name }) => (
                <View>
                    <Text>
                        {name}
                    </Text>
                </View>
            ))}
    </View>
);

const UI = ({
    state,
    state: { productCategories },
    setCategory
}) => (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
                <Text>Filter by Category</Text>
                {productCategories.map(category => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => setCategory(category)}
                    >
                        <Text>{category}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text>Results</Text>
                <ProductItems state={state} />
            </View>
        </View>
    );

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayCategory: "all",
            products: props.products,
            productCategories: props.productCategories
        };
        this.setCategory = this.setCategory.bind(this);
    }
    setCategory(category) {
        this.setState({
            displayCategory: category
        });
    }
    render() {
        return <UI setCategory={this.setCategory} state={this.state} />;
    }
}

export default class Groups extends Component {
    render() {
        return (
            <Main products={PRODUCTS} productCategories={PRODUCT_CATEGORIES} />
        );
    }
}
