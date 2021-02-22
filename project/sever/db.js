const types = [
  {id: 1, name: 'Rau'},
  {id: 2, name: 'Củ'},
  {id: 3, name: 'Nấm'},
  {id: 4, Name: 'Quả'}
]

const species = [
  {id: 1, name: 'Tươi'},
  {id: 2, name: 'Khô'}
]

const products = [
  {
    id: 1,
    name: 'Hành',
    price: 5000,
    img: '',
    typeId: 2,
    speciesId: 2,
    comments: {},
    evaluates: {
      number: 2,
      point: 9
    }
  },
  {
    id: 2,
    name: 'Nấm hương khô',
    price: 1000,
    img: '',
    typeId: 3,
    speciesId: 2,
    comments: {},
    evaluates: {
      number: 2,
      point: 9
    }
  },
]


module.exports = () => ({
  products,
  types,
  species
})
