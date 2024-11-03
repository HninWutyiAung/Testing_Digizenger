// const chatList = [
//     {
//         id: '1',
//         title: 'Emma Noble', // Group name
//         messages: [{id: '1',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10:00PM", },
//             {id: '2',
//                 content: "What Are You Doing",
//                 sender: "server",
//                 timestamp: "11:00PM", },

//             {id: '3',
//                 content: "What Are You Doing",
//                 sender: "user",
//                 timestamp: "12:00PM", }
//         ],
//     },
//     {
//         id: '2',
//         title: 'Andrea', // Username
//         messages: [{id: '1',
//             content: "Have you eaten",
//             sender: "user",
//             timestamp: "10:00PM", },

//             {id: '2',
//                 content: "No I'm Working",
//                 sender: "server",
//                 timestamp: "10:01PM", }
        
//         ],
//     },
//     {
//         id: '3',
//         title: 'Ivan', // Custom label
//         messages: [{id: '3',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '4',
//         title: 'chalie', // Group name
//         messages: [{id: '4',
//             content: "Good Morning",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '5',
//         title: 'Diana', // Username
//         messages: [{id: '5',
//             content: "Good Nignt",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '6',
//         title: 'Olivia', // Custom label
//         messages: [{id: '6',
//             content: "What!",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '7',
//         title: 'Your Bob', // Group name
//         messages: [{id: '7',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '8',
//         title: 'William', // Username
//         messages: [{id: '8',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '9',
//         title: 'Jack', // Custom label
//         messages: [{id: '9',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10PM", }],
//     },  
      
//     {
//         id: '10',
//         title: 'Emma Noble', // Group name
//         messages: [{id: '10',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '11',
//         title: 'Andrea', // Username
//         messages: [{id: '11',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10PM", }],
//     },
//     {
//         id: '12',
//         title: 'Ivan', // Custom label
//         messages: [{id: '12',
//             content: "Have you eaten",
//             sender: "server",
//             timestamp: "10PM", }],
//     },

// ];


// export default chatList;
const selectedUserId = 3;
const chatList = [
    {
        id: '1',
        title: 'Emma Noble', // Group name
        messages: [{id: '1',
            message: "Have you eaten",
            user: { "id":1},
            recipientId: selectedUserId,
            type: "TEXT",
 },
            {id: '2',
                message: "Have you eaten",
            user: { "id":1},
            recipientId: selectedUserId,
            type: "TEXT", },

            {id: '3',
                message: "Have you eaten",
            user: { "id":1},
            recipientId: selectedUserId,
            type: "TEXT", }
        ],
    },

];


export default chatList;