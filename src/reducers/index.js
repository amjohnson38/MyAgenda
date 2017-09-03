import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';
//allows cookies to be implemented in order for the user to keep the same agendas each time they open the app
import {bake_cookie, read_cookie} from 'sfcookies';

//helper reminder fuction 
const reminder = (action) => {
    let { text, dueDate } =action;
    return {
        id: Math.random(),
        text, dueDate
    }
}

//removes the id of the reminder
const removeByID = (state = [], id) => {
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders;
}
const reminders = (state = [], action) => {
    let reminders = null;
    //the state is being set when the cookie is being read, it is being set to the array of reminders
    state = read_cookie('reminders'); 
    switch (action.type) {
        case ADD_REMINDER:
            //spread operator (...) allows the contents of one array or object to be copied into another array or object
            reminders = [...state, reminder(action)];
            //'reminders' is the name of the value put in the cookie, the cookie contains the array reminders and it is stored on the users browser
            bake_cookie('reminders', reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removeByID(state, action.id);
            //the updated array is passed to replace the previous array stored in the cookie
            bake_cookie('reminders', reminders)
            return reminders;
        case CLEAR_REMINDERS:
        reminders = [];
        //the cookie get stored when reminders is cleared 
        bake_cookie('reminders', reminders)
        return reminders;
        default:
            return state;

    }
}

export default reminders;