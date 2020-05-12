let products = [
    { name : 'cucumber', type : 'vegetable' },
    { name : 'banana', type : 'fruit' },
    { name : 'celery', type : 'vegetable' },
    { name : 'orange', type : 'fruit' }
];

let filteredProducts = [];

// Es5 method
for( var i = 0; i < products.length; i++ ) {
  if( products[i].type === 'fruit' ) {
    filteredProducts.push( products[i] );
  }
}

console.log( filteredProducts );

//Es6 Method
let filteredProducts = [];
filteredProducts = products.filter( ( product ) => {
   return product.type === 'fruit' 
} );