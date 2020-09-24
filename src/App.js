import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://sid:sidsidsid@formycat.vxasp.mongodb.net/tracker?retryWrites=true&w=majority', {useNewUrlParser: true},{ useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected !!')
});

// const pizzaSchema = new mongoose.Schema({
//     name : String,
//     orderedPizza : String,
//     quantity : Number
//   })

//   const pizza = mongoose.model('yoyopizza', pizzaSchema)

//   const createDoc =()=>{const create = new pizza({ name: 'sidd',orderedPizza:'Veg pizza',quantity:5 })
//   create.save(function (err, create) {
//     if (err) return console.error(err) 
//     create.speak()
//   })
// }
// createDoc()

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      choose: '',
      Quantity: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, choose, Quantity } = steps;

    this.setState({ name, choose, Quantity });
  }

  render() {
    const { name, choose, Quantity } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Selected Pizza</td>
              <td>{choose.value}</td>
            </tr>
            <tr>
              <td>Quantity</td>
              <td>{Quantity.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class SimpleForm extends Component {
  render() {
    return (
      <ChatBot
        steps={[
          {
            id: '1',
            message: 'Hey there, Welcome to YoYo Pizza !🤩 If ordered, type /Status to know about your order status or Enter your name & dive in😎🍕😋',
            trigger: 'name',
          },
          {
            id: 'name',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}! Happy to serve you, Please select your Favourite 🍅',
            trigger: 'choose',
          },
          {
            id: 'choose',
            options: [
              { value: 'Veg Pizza', label: 'Veg Pizza', trigger: '5' },
              { value: 'Non-Veg Pizza', label: 'Non-Veg Pizza', trigger: '5' },
            ],
          },
          {
            id: '5',
            message: 'Please enter the quantity, we wish serve you as much you need!!😁',
            trigger: 'Quantity',
          },
          {
            id: '11',
            message: `Enter your new name 😂🤐😛` ,
            trigger: 'update-name'
          },
          {
            id: 'Quantity',
            user: true,
            trigger: '7',
            validator: (value) => {
              if (isNaN(value)) {
                return 'value must be a number';
              } else if (value < 0) {
                return 'value must be positive';
              } else if (value > 120) {
                return `${value}? Come on!`;
              }

              return true;
            },
          },
          {
            id: '7',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'update',
          },
          {
            id: 'update',
            message: 'Would you like to update some field?',
            trigger: 'update-question',
          },
          {
            id: 'update-question',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'update-yes' },
              { value: 'no', label: 'No', trigger: 'end-message' },
            ],
          },
          {
            id: 'update-yes',
            message: 'What field would you like to update?',
            trigger: 'update-fields',
          },
          {
            id: 'update-fields',
            options: [
              { value: 'name', label: 'Name', trigger: '11' },
              { value: 'choose', label: 'Selected Pizza', trigger: 'update-choose' },
              { value: 'Quantity', label: 'Quantity', trigger: '5' },
            ],
          },
          {
            id: 'update-name',
            update: 'name',
            trigger: '7',
          },
          {
            id: 'update-choose',
            update: 'choose',
            trigger: '7',
          },
          {
            id: 'update-Quantity',
            update: 'Quantity',
            trigger: '7',
          },
          {
            id: 'end-message',
            message: 'Thanks! Your data was submitted successfully!',
            end: true,
          },
        ]}
      />
    );
  }
}

export default SimpleForm;