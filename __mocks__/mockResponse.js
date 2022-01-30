function generateResponse() {
  return {
    data: {
      past_due: [
        {
          title: 'Take out the trash',
          due_date: '2022-01-03',
          owner: 'Joe Jones'
        },
        {
          title: 'Vaccuum living room',
          due_date: '2022-01-03',
          owner: 'Steve Smith'
        },
        {
          title: 'Polish boots',
          due_date: '2022-01-15',
          owner: 'Joe Jones'
        }
      ],
      today: [
        {
          title: 'Do the dishes',
          due_date: '2022-01-29',
          owner: 'Joe Jones'
        },
        {
          title: 'Cook Dinner',
          due_date: '2022-01-29',
          owner: 'Steve Smith'
        }
      ]
    }
  };
}

module.exports = { generateResponse };
